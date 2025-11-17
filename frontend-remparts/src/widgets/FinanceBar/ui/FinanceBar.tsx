'use client';

import { useExchangeRate } from '@/entities/exchangeRate';

import { useAuth } from '@/shared/hooks';
import { Container } from '@/shared/ui';

export function FinanceBar() {
  const { exchangeRate } = useExchangeRate();
  const { auth } = useAuth();

  if (!auth) {
    return null;
  }

  return (
    <div className="border-b-text-additional text-additional border-b-[1px] py-0 pt-1 text-xs font-light md:text-sm">
      <Container className="flex justify-between py-0">
        <div>{`Курс: 1 USD = ${exchangeRate} грн.`}</div>
        <div>Ваш Баланс: 0</div>
      </Container>
    </div>
  );
}
