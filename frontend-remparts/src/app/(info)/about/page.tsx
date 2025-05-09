import Link from 'next/link';
import { Breadcrumbs } from '../ui';
import Image from 'next/image';
import { EMAIL, PHONE_NUMBER } from '@/shared/config';

export default function AboutPage() {
  return (
    <div className="text-sm leading-normal md:text-base">
      <Breadcrumbs pageName="Про нас" />
      <h1 className="my-3 text-2xl font-bold md:text-3xl">Про Remparts</h1>
      <div
        className="relative max-h-[250px] w-full overflow-hidden after:block after:h-full after:w-full after:pb-[100%]
          after:content-['']"
      >
        <Image
          src="/about.webp"
          alt="Про нас"
          fill
          className="absolute h-full w-full object-cover"
        />
      </div>
      <div className="mt-3 space-y-4">
        <p>
          Ми — команда фахівців, яка понад 5 років працює у сфері постачання запчастин для мобільних
          телефонів. Наша компанія спеціалізується на продажу якісних комплектуючих для смартфонів
          провідних брендів, таких як Apple, Samsung, Xiaomi, Huawei, та інших. Ми пропонуємо
          широкий асортимент запчастин — від дисплейних модулів до акумуляторів, шлейфів, камер і
          роз`&apos;ємів.
        </p>

        <p>
          Наша місія — забезпечити майстрів сервісних центрів, магазинів і кінцевих споживачів
          надійними деталями за доступними цінами. Ми ретельно відбираємо постачальників, тестуємо
          продукцію та надаємо гарантію на всі товари. Оперативна доставка, зручна система
          замовлення та професійна підтримка клієнтів — те, що відрізняє нас на ринку.
        </p>

        <p>
          Ми працюємо безпосередньо з перевіреними виробниками та постачальниками, що дозволяє нам
          гарантувати оригінальність та високу якість усіх запчастин. В асортименті ви знайдете як
          оригінальні деталі, так і якісні копії категорій AAA та High Copy, що відповідають
          потребам різних бюджетів і типів ремонту.
        </p>

        <p>
          Крім продажу запчастин, ми також надаємо професійні послуги з ремонту мобільних телефонів
          будь-якої складності. Наш сервісний центр оснащений сучасним обладнанням, а майстри мають
          великий досвід у відновленні смартфонів різних брендів. Ми виконуємо як стандартні види
          ремонту — заміну екранів, батарей, корпусних елементів, так і складніші роботи, такі як
          мікропаяльні роботи, відновлення після залиття або перепрошивка.
        </p>

        <p>
          Ми використовуємо виключно якісні комплектуючі, що гарантує стабальну роботу пристрою
          після ремонту. Кожне замовлення проходить контроль якості, а на виконані роботи та
          встановлені деталі надається гарантія. Наша мета — забезпечити клієнтам швидке, надійне й
          доступне рішення, щоб ваш телефон знову працював, як новий.
        </p>
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-bold">Контакти</h2>
        <p className="my-2">
          Якщо у вас виникли питання або ви хочете дізнатися більше про наші послуги, не соромтеся
          звертатися до нас:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <b className="font-semibold">Телефон:</b> {PHONE_NUMBER.value}
          </li>
          <li>
            <b className="font-semibold">
              Email:{' '}
              <Link
                href={`mailto:${EMAIL}`}
                className="cursor-pointer font-normal underline-offset-2 hover:underline"
              >
                {EMAIL}
              </Link>
            </b>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Графік роботи</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <b className="font-semibold">Понеділок-П&apos;ятниця:</b> 11:00 — 18:00
          </li>
          <li>
            <b className="font-semibold">Субота:</b> 11:00 — 18:00
          </li>
          <li>
            <b className="font-semibold">Неділя:</b> вихідний
          </li>
        </ul>
      </div>
    </div>
  );
}
