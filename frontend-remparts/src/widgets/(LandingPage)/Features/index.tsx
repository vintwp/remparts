import Image from 'next/image';
import { Container } from '@/shared/ui';

export function Features() {
  return (
    <div className="bg-neutral-50 py-4">
      <Container
        className="flex basis-full flex-wrap justify-between gap-2 lg:flex-nowrap md:[&>div]:basis-[calc(50%-8px)]
          lg:[&>div]:basis-1/4"
      >
        <div className="flex shrink items-center gap-2">
          <div className="shrink-0">
            <Image
              width={80}
              height={80}
              alt="Delivery"
              src="/icons/delivery.png"
            />
          </div>
          <p>
            <b>Доставка</b> Нова Пошта 1-3 дні
          </p>
        </div>
        <div className="flex shrink items-center gap-2">
          <div className="shrink-0">
            <Image
              width={80}
              height={80}
              alt="Delivery"
              src="/icons/warranty.png"
            />
          </div>
          <p>
            <b>Гарантія 30 днів</b> при дотриманні гарантійних умов
          </p>
        </div>
        <div className="flex shrink items-center gap-2">
          <div className="shrink-0">
            <Image
              width={80}
              height={80}
              alt="Delivery"
              src="/icons/shop.png"
            />
          </div>
          <p>
            <b>Спеціальні умови</b> для сервісних центрів і майстрів
          </p>
        </div>
        <div className="flex shrink items-center gap-2">
          <div className="shrink-0">
            <Image
              width={80}
              height={80}
              alt="Delivery"
              src="/icons/assortment.png"
            />
          </div>
          <p>
            <b>Широкий асортимент</b> запчастин постійно в наявності
          </p>
        </div>
      </Container>
    </div>
  );
}
