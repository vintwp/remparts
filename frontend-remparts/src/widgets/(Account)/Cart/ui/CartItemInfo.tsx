type Props = {
  id: number;
  name: string;
};

export function CartItemInfo({ id, name }: Props) {
  return (
    <div className="grow basis-8/12 self-start md:basis-8/12 md:px-0">
      <p className="text-[8px] text-black/30 sm:text-[12px]">Код товару - {id}</p>
      <p className="text-xs leading-5 sm:text-[18px]">{name}</p>
    </div>
  );
}
