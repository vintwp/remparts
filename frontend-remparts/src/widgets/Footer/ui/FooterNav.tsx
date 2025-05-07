import { FooterLink } from './components/FooterLink';
import { FooterHeading } from './components/FooterHeading';

export function FooterNav() {
  return (
    <div className="flex flex-col text-white">
      <FooterHeading text="Remparts" />
      <FooterLink
        href="/"
        text="Головна"
        className="mt-2"
      />
      <FooterLink
        href="/payment-and-delivery"
        text="Оплата і доставка"
      />
      <FooterLink
        href="/warranty-and-returns"
        text="Обмін та повернення"
      />
      <FooterLink
        href="/about"
        text="Про нас"
      />
      <FooterLink
        href="/contacts"
        text="Контакти"
      />
    </div>
  );
}
