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
        href="/delivery"
        text="Оплата і доставка"
      />
      <FooterLink
        href="/delivery"
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
