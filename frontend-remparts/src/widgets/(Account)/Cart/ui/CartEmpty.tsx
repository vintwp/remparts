import Image from 'next/image';

export function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-start">
      <Image
        src={'/empty-cart.png'}
        alt={'empty cart'}
        width={300}
        height={300}
      />
      <h3 className="text-2xl font-semibold">Кошик порожній</h3>
      <p className="text-sm text-neutral-400">Але це ніколи не пізно виправити :)</p>
    </div>
  );
}
