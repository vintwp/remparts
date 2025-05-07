import { FooterLink } from './components/FooterLink';
import { FooterHeading } from './components/FooterHeading';

export function FooterContacts() {
  return (
    <div className="flex flex-col text-white">
      <FooterHeading text="Контакти" />
      <FooterLink
        href="tel:+380000000000"
        text="+380000000000"
        className="mt-2 font-semibold md:text-lg"
      />
      <FooterLink
        href="mailto:test@gmail.com"
        text="test@gmail.com"
      />

      <div className="mt-4 font-extralight">
        <p>Пн-Пт з 10:00 до 17:30</p>
        <p>Сб з 10:00 до 15:00, Нд вихідний</p>

        <p className="mt-2">Україна, Миколаїв ....</p>
      </div>
    </div>
  );
}
