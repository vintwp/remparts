'use client';

import { useExchangeRate } from '@/entities/exchangeRate';

import { useAuth } from '@/shared/hooks';
import { Container } from '@/shared/ui';

export function FinanceBar() {
  const { exchangeRate } = useExchangeRate();
  const { authorization } = useAuth();

  if (!authorization) {
    return null;
  }

  return (
    <div className="border-b-text-additional text-additional border-b-[1px] py-0 pt-1 text-xs font-light md:text-sm">
      <Container className="flex justify-between py-0">
        <div>{`Курс: 1 USD = ${exchangeRate} грн.`}</div>
        <div>
          <p>Ваш Баланс: 0</p>
        </div>
      </Container>
    </div>
  );
}
