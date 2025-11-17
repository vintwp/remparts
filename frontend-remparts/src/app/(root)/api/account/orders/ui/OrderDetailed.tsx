type Props = {
  orderHash: string;
};

export function OrderDetailed({ orderHash }: Props) {
  return <>orderHash - {orderHash}</>;
}
