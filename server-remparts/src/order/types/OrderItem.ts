export type OrderItem = {
  id: number;
  orderId: number;
  itemId: number;
  itemPrice: number;
  itemQty: number;
  item: {
    name: string;
  };
};
