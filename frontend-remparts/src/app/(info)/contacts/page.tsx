import Link from 'next/link';
import { Breadcrumbs } from '../ui';
import { EMAIL, PHONE_NUMBER } from '@/shared/config';

export default function ContactsPage() {
  return (
    <>
      <Breadcrumbs pageName="Контакти" />
      <h1 className="my-3 text-2xl font-bold md:text-3xl">Контакти</h1>
      <div className="my-4 space-y-4">
        <p>Ми знаходимось за адресою: м. Миколаїв, вул. Маріупольска 7</p>
        <div className="">
          <h3 className="font-semibold">Контактні дані</h3>
          <div className="mt-2 list-disc space-y-2 pl-1 text-sm">
            <p>
              Email -{' '}
              <Link
                href={`mailto:${EMAIL}`}
                className="cursor-pointer font-semibold underline-offset-2 hover:underline"
              >
                {EMAIL}
              </Link>
            </p>
            <p>
              Телефон -{' '}
              <Link
                href={`tel:${PHONE_NUMBER.href}`}
                className="cursor-pointer font-semibold underline-offset-2 hover:underline"
              >
                {PHONE_NUMBER.value}
              </Link>
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Графік роботи</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm">
            <li>
              <b className="font-semibold">Понеділок-П`&apos;ятниця:</b> 10:00 — 17:00
            </li>
            <li>
              <b className="font-semibold">Субота:</b> 10:00 — 16:00
            </li>
            <li>
              <b className="font-semibold">Неділя:</b> вихідний
            </li>
          </ul>
        </div>
      </div>
      <div className="overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d404.69673037398735!2d31.99423707740208!3d46.972215619573134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c5c9943399c5c7%3A0x2a0de9e8d1ac7285!2sSMARTFIX!5e0!3m2!1sru!2sua!4v1746725555707!5m2!1sru!2sua"
          width="100%"
          height="400"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}
