import { Inject, Injectable } from '@nestjs/common';
import { Invoice, InvoiceToItem } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CustomPrismaService } from 'nestjs-prisma';
import { ItemService } from 'src/item/item.service';
import { chunkArray } from 'src/lib/utils';
import { ExtendedPrismaClient } from 'src/prisma.extension';

@Injectable()
export class InvoiceService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private readonly itemService: ItemService,
  ) {}

  async createAndUpdateInvoice(data: Array<Invoice & { item: InvoiceToItem[] }>) {
    try {
      const chunkedInvoices = chunkArray(data, 10);

      for (const chunkedInvoice of chunkedInvoices) {
        await this.prismaService.client.$transaction(
          chunkedInvoice.map(invoice =>
            this.prismaService.client.invoice.upsert({
              where: {
                id: invoice.id,
              },
              update: {
                userId: invoice.userId,
                totalAmount: invoice.totalAmount,
                comment: invoice.comment,
                item: {
                  deleteMany: {},
                  create: invoice.item.map(item => ({
                    itemId: item.itemId,
                    price: item.price,
                    itemQty: item.itemQty,
                    amountPerItem: item.amountPerItem,
                  })),
                },
              },
              create: {
                id: invoice.id,
                id1c: invoice.id1c,
                userId: invoice.userId,
                totalAmount: invoice.totalAmount,
                createdAt: invoice.createdAt.toISOString(),
                comment: invoice.comment,
                item: {
                  create: invoice.item.map(item => ({
                    itemId: item.itemId,
                    price: item.price,
                    itemQty: item.itemQty,
                    amountPerItem: item.amountPerItem,
                  })),
                },
              },
            }),
          ),
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
