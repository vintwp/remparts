import { Container } from '@/shared/ui';

export function SubHeader() {
  // shadow-[2px_3px_4px_0_rgba(0,0,0,0.25)]
  return (
    <div className="bg-primary-alt px-3 py-2 text-white md:py-4">
      <Container type="fluid">
        <p className="text-center font-light">
          Замовлення, оплачені до 16:00, відправляються в той же день
        </p>
      </Container>
    </div>
  );
}
