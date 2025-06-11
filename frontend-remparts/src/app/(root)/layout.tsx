import HolyLoader from 'holy-loader';

import { FinanceBar } from '@/widgets/FinanceBar';
import { Footer } from '@/widgets/Footer';
import { MainHeader, TopHeader } from '@/widgets/Header';

import { getExchangeRate } from '@/entities/exchangeRate';

import { auth } from '@/shared/config/auth';
import { Toaster } from '@/shared/ui';

import { SWRProvider } from '../providers/swrProvider';

// 15.2.4

export default async function RootLayout({
  login,
  children,
}: Readonly<{
  login: React.ReactNode;
  children: React.ReactNode;
}>) {
  const exchangeRateResponse = await getExchangeRate();
  const session = await auth();

  return (
    <SWRProvider
      value={{
        fallback: {
          exchangeRate: exchangeRateResponse.ok ? exchangeRateResponse.data : 1,
          authorization: session,
        },
      }}
    >
      <HolyLoader color="rgba(43,94,122,0.6)" />
      <FinanceBar />
      <TopHeader />
      <MainHeader className="sticky top-0 z-10 md:static" />
      {login}
      <main
        className="flex-1"
        id="main"
      >
        {children}
      </main>
      <Footer />
      <Toaster richColors />
    </SWRProvider>
  );
}
