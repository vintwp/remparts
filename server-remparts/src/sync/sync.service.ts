import { Injectable } from '@nestjs/common';
import { ItemService } from 'src/item/item.service';
import { SyncCatalogDto } from './dto/sync-catalog.dto';
import { UserService } from 'src/user/user.service';
import { UserSettlementsDto } from './dto/user-settlements.dto';
import { Currency, Invoice, InvoiceToItem, Payment, User } from '@prisma/client';
import { compareArrayOfObjectsByKeys, compareObjectsByKeys, parseDate } from 'src/lib/utils';
import { PaymentService } from 'src/payment/payment.service';
import { InvoiceService } from 'src/invoice/invoice.service';
import { OrderService } from 'src/order/order.service';
import { json2csv } from 'json-2-csv';
import { PostProcessedOrdersDto } from './dto/post-processed.dto';

@Injectable()
export class SyncService {
  constructor(
    private readonly itemService: ItemService,
    private readonly userService: UserService,
    private readonly paymentService: PaymentService,
    private readonly invoiceService: InvoiceService,
    private readonly orderService: OrderService,
  ) {}

  async syncCatalog(itemsFrom1c: SyncCatalogDto[]) {
    const items1c = itemsFrom1c.map(itm => {
      // avoid unexpected updates when field 1c is empty or zero (department, category, vrand, quality, compliance)
      const {
        id,
        afmId,
        departmentId,
        categoryId,
        brandId,
        complianceId,
        qualityId,
        isHidden,
        ...rest
      } = itm;
      return {
        ...rest,
        id1c: id,
        idAfm: afmId,
        departmentId: departmentId || 1,
        categoryId: categoryId || 1,
        qualityId: qualityId || 1,
        brandId: brandId || 1,
        complianceId: complianceId || 1,
        isHidden: isHidden || false,
      };
    });

    return this.itemService.createAndUpdateMany(items1c);
  }

  async syncSettlements(userSettlements: UserSettlementsDto[]) {
    const users = await this.userService.manageUsersRedisCache('RESET');

    // 1C:Enterprise assigns invoice and payment IDs starting from 0000000001 at the beginning of each calendar year.
    // To prevent duplicates between invoices and payments, we generate a hash using (id + date). It generates by 1C.
    // This hash is used as the primary key in the database.
    // The original 1C ID is stored in the 'id1c' property.

    const usersMapped = new Map(users.map(user => [user.id1c, user]));

    const usersBalanceToUpdate: Array<Pick<User, 'id' | 'balance' | 'customerPriceTier'>> = [];
    const paymentsToCreateAndUpdate: Payment[] = [];
    const usersInvoiceToUpdate: Array<Invoice & { item: InvoiceToItem[] }> = [];

    for (const userSettlement of userSettlements) {
      const user = usersMapped.get(userSettlement.id1c);

      if (!user) continue;

      const { id, payment } = user;

      // #region check for user balance and price tier differs
      if (!compareObjectsByKeys(user, userSettlement, ['balance', 'customerPriceTier'])) {
        usersBalanceToUpdate.push({
          id,
          balance: userSettlement.balance,
          customerPriceTier: userSettlement.customerPriceTier,
        });
      }
      // #endregion

      // #region check for user payments differs
      const paymentsFromUserSettlements = userSettlement.payments.map(payment => ({
        ...payment,
        userId: id,
        id: payment.hash,
        id1c: payment.id,
        currency: payment.currency === 'Доллар' ? Currency.USD : Currency.UAH,
        createdAt: parseDate(payment.createdAt),
      }));

      const paymentsCompared = compareArrayOfObjectsByKeys(
        payment,
        paymentsFromUserSettlements,
        ['currency', 'value'],
        'id',
      );

      paymentsToCreateAndUpdate.push(
        ...paymentsCompared.notEqualObjects,
        ...paymentsCompared.missedInReferenceObjects,
      );
      // #endregion

      // #region check for user invoices differs
      // logic of check and update
      // 1. Compare totalAmount of invoices by hash (it stored as id in database)
      // 2. Create/update records of invoices in data base

      const invoicesFromUserSettlements: Array<Invoice & { item: InvoiceToItem[] }> =
        userSettlement.invoices.map(invoice => {
          const userId = id;
          const invoiceId = invoice.hash;
          const invoiceId1c = invoice.id;
          const createdAt = invoice.createdAt;
          const comment = invoice.comment;
          const items = invoice.items
            .map(item => ({
              invoiceId,
              invoiceId1c,
              userId,
              itemId: item.id,
              itemQty: item.qty,
              amountPerItem: item.amountPerItem,
              price: item.price,
            }))
            .sort((item1, item2) => item1.itemId.localeCompare(item2.itemId));

          // items sorted by id, because compare function uses json.stringify to compare array of objects
          // it costs lower performance than deep equal

          return {
            id: invoiceId,
            id1c: invoiceId1c,
            userId,
            createdAt: parseDate(createdAt),
            totalAmount: invoice.totalAmount,
            item: items,
            comment,
          };
        });

      const invoicesFromDb: Array<Invoice & { item: InvoiceToItem[] }> = user.invoice.map(
        invoice => {
          const userId = invoice.userId;
          const invoiceId = invoice.id;
          const invoiceId1c = invoice.id1c;
          const createdAt = invoice.createdAt;
          const invoiceComment = invoice.comment;

          const items = invoice.item.map(item => ({
            invoiceId,
            invoiceId1c,
            userId,
            itemId: item.id,
            itemQty: item.itemQty,
            amountPerItem: item.amountPerItem,
            price: item.price,
          }));

          return {
            id: invoiceId,
            id1c: invoiceId1c,
            userId,
            createdAt: createdAt,
            totalAmount: invoice.totalAmount,
            item: items,
            comment: invoiceComment,
          };
        },
      );

      const invoicesCompared = compareArrayOfObjectsByKeys(
        invoicesFromDb,
        invoicesFromUserSettlements,
        ['totalAmount', 'item', 'comment'],
        'id',
      );

      usersInvoiceToUpdate.push(
        ...invoicesCompared.notEqualObjects,
        ...invoicesCompared.missedInReferenceObjects,
      );
      // #endregion
    }

    await this.userService.updateUserBalanceAndPriceTier(usersBalanceToUpdate);
    await this.paymentService.createAndUpdatePayments(paymentsToCreateAndUpdate);
    await this.invoiceService.createAndUpdateInvoice(usersInvoiceToUpdate);
    await this.userService.manageUsersRedisCache('RESET');
  }
  async syncOrders() {
    const orders = await this.orderService.getUnsyncOrders();

    const ordersToUpload = orders
      .flatMap(order => {
        const { id, item: itemOrder, user } = order;

        const itemsFromOrder = itemOrder.map(itm => {
          const {
            itemQty,
            item: { id1c: itemId1c },
          } = itm;

          return {
            userId: user.id1c,
            orderId: id,
            itemId1c: itemId1c,
            itemQty: itemQty,
            orderComment: order.comment,
          };
        });

        return itemsFromOrder;
      })
      .sort((item1, item2) => item1.orderId - item2.orderId);

    const ordersCsv = await json2csv(ordersToUpload, {
      delimiter: {
        eol: '^',
      },
    });

    return {
      order: orders,
      orderCsv: ordersCsv,
    };
  }

  async updateOrders(data: PostProcessedOrdersDto[]) {
    const existOrders = await this.orderService.getAllOrders();

    const invoicesCompared = compareArrayOfObjectsByKeys(
      existOrders,
      data,
      ['id1c', 'processed', 'comment', 'totalAmount', 'invoiceHash', 'invoiceId'],
      'id',
    );

    const ordersToUpdate = invoicesCompared.notEqualObjects.map(order => ({
      id: order.id,
      id1c: order.id1c,
      processed: order.processed,
      comment: order.comment || '',
      totalAmount: order.totalAmount,
      invoiceId: order.invoiceId || '',
      invoiceHash: order.invoiceHash || '',
      orderHash: order.orderHash || '',
    }));

    return this.orderService.updateOrders(ordersToUpdate);
  }
}
