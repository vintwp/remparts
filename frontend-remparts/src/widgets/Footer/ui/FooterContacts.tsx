import { FooterLink } from './components/FooterLink';
import { FooterHeading } from './components/FooterHeading';
import { EMAIL, PHONE_NUMBER } from '@/shared/config';

export function FooterContacts() {
  return (
    <div className="flex flex-col text-white">
      <FooterHeading text="Контакти" />
      <FooterLink
        href={`tel:${PHONE_NUMBER.href}`}
        text={PHONE_NUMBER.value}
        className="mt-2 font-semibold md:text-lg"
      />
      <FooterLink
        href={`mailto:${EMAIL}`}
        text={EMAIL}
      />

      <div className="mt-4 font-extralight">
        <p>Пн-Пт з 11:00 до 18:00</p>
        <p>Сб з 11:00 до 18:00, Нд вихідний</p>

        <p className="mt-2">м. Миколаїв вул. Маріупольска 7</p>
      </div>
    </div>
  );
}
