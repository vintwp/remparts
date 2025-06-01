import HolyLoader from 'holy-loader';

import { Footer } from '@/widgets/Footer';
import { MainHeader, TopHeader } from '@/widgets/Header';

import { Toaster } from '@/shared/ui';

// 15.2.4

export default function RootLayout({
  login,
  children,
}: Readonly<{
  login: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <>
      <HolyLoader color="rgba(43,94,122,0.6)" />
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
    </>
  );
}
