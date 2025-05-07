import Image from 'next/image';
import { Breadcrumbs } from '../ui';
import { Separator } from '@/shared/ui';
import Link from 'next/link';

export default function WarrantyAndReturnsPage() {
  return (
    <div className="text-sm leading-normal md:text-base">
      <Breadcrumbs pageName="Обмін та повернення" />
      <h1 className="my-3 text-2xl font-bold md:text-3xl">Умови повернення та обміну товарів</h1>
      <div
        className="relative max-h-[250px] w-full overflow-hidden after:block after:h-full after:w-full after:pb-[100%]
          after:content-['']"
      >
        <Image
          src="/returns.jpg"
          alt="Обмін та повернення"
          fill
          className="absolute h-full w-full object-cover"
        />
      </div>
      <p className="my-3">
        Компанія здійснює повернення та обмін товарів належної і неналежної якості відповідно до
        вимог Закону України «Про захист прав споживачів».
      </p>
      <div className="pb-3">
        <h3 className="mb-2 text-lg font-semibold md:text-xl">Строки повернення та обміну</h3>
        <p className="mb-2">
          Повернення або обмін товару можливий протягом 14 календарних днів з моменту отримання
          замовлення покупцем.
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            У разі повернення товару належної якості витрати на зворотну доставку несе покупець.
          </li>
          <li>
            У разі повернення товару неналежної якості витрати на зворотну доставку покриває
            продавець.
          </li>
        </ul>
      </div>
      <Separator />
      <div className="py-3">
        <h3 className="mb-2 text-lg font-semibold md:text-xl">
          Умови повернення товарів належної якості
        </h3>
        <p className="mb-2">
          Повернення або обмін товарів належної якості здійснюється за таких умов:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            товар не використовувався і не має зовнішніх ознак експлуатації (подряпини, сколи,
            потертості, плями тощо);
          </li>
          <li>
            товар повністю укомплектований, має оригінальне пакування та всі супровідні елементи
            (ярлики, заводське маркування);
          </li>
          <li>збережено товарний вигляд та споживчі властивості товару.</li>
        </ul>
      </div>
      <Separator />
      <div className="py-3">
        <h3 className="mb-2 text-lg font-semibold md:text-xl">
          Умови повернення товарів неналежної якості
        </h3>
        <p className="mb-2">
          Товар вважається таким, що не відповідає вимогам якості, якщо він має недоліки, які
          унеможливлюють його використання за призначенням. Зокрема, мова йде про:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>товар, що вже був у використанні;</li>
          <li>
            товар з виробничими дефектами або пошкодженнями (подряпини, сколи, тріщини, плями тощо);
          </li>
          <li>товар з неповною комплектацією.</li>
        </ul>
      </div>
      <Separator />
      <div className="py-3">
        <h3 className="mb-2 text-lg font-semibold md:text-xl">
          Порядок здійснення повернення або обміну
        </h3>
        <ul className="mb-2 list-disc space-y-1.5 pl-5">
          <li>
            Зверніться на електронну адресу{' '}
            <Link
              href="mailto:test@gmail.com"
              className="font-medium underline-offset-2 hover:underline"
            >
              test@gmail.com
            </Link>{' '}
            або за телефоном <span className="font-medium">+38 (093) 000 00 00</span>, коротко
            опишіть ситуацію, додайте фото або відео придбаного товару.
          </li>
          <li>
            Повідомте номер замовлення або номер телефону, на який оформлено замовлення, вкажіть
            найменування товару, причину повернення/обміну та номер банківської картки для
            повернення коштів.
          </li>
          <li>
            Надішліть товар у належному стані (без пошкоджень, подряпин, у непошкодженому
            пакуванні). Товари, що були у використанні або втратили споживчі властивості, не
            підлягають поверненню, окрім випадків, передбачених гарантією.
          </li>
        </ul>
        <p className="mb-2">
          Повернення та обмін товарів здійснюється через службу доставки{' '}
          <span className="font-medium">Нова Пошта</span>.
        </p>

        <p className="mb-2 font-semibold">Дані для відправлення:</p>

        <ul className="mb-4 list-disc space-y-1.5 pl-5">
          <li>м. Миколаїв, відділення Нової Пошти № 2</li>
          <li>Отримувач: Терпугов Денис Вікторович</li>
          <li>Телефон отримувача: +38 (063) 610 98 83</li>
        </ul>

        <p>
          Після отримання товару компанія здійснює повернення коштів або обмін товару протягом{' '}
          <span className="font-semibold">3 (трьох)</span> робочих днів.
        </p>
      </div>
    </div>
  );
}
