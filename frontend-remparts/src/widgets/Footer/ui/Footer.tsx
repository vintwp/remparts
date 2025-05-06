import Image from 'next/image';
import { Container } from '@/shared/ui';
import { LowerFooter } from './LowerFooter';
import { FooterContacts } from './FooterContacts';
import { FooterNav } from './FooterNav';

export function Footer() {
  return (
    <div className="relative overflow-hidden bg-linear-to-r from-[rgba(43,94,122,0.9)] to-[rgba(17,58,80,0.9)]">
      <Image
        src="/footer-bg.jpg"
        alt="Remparts Contact"
        fill
        className="-z-10 object-cover"
      />
      <footer className="py-10">
        <Container>
          <div className="flex flex-col sm:flex-row-reverse sm:justify-end sm:gap-[5%]">
            <div className="basis-full md:basis-auto">
              <FooterNav />
            </div>
            <div className="mt-5 basis-full sm:mt-0 md:basis-auto">
              <FooterContacts />
            </div>
          </div>
          <p className="mt-10 text-center text-[#4480A0]">
            *Всі торгові марки, логотипи та елементи дизайну представлені на цьому сайті, є
            власністю їхніх відповідних власників та служать виключно з інформаційною метою.
          </p>
        </Container>
      </footer>
      <LowerFooter />
    </div>
  );
}
