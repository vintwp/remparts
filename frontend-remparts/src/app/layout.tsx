import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { SWRDevTool } from './providers/swrDevTools';

const inter = Inter({
  subsets: ['cyrillic'],
});

export const metadata: Metadata = {
  title: {
    absolute: 'Remparts - Запчастини, аксесуари для мобільних телефонів та ремонт',
    template: '%s | Remparts',
  },
  description:
    'Remparts – запчастини, аксесуари та ремонт мобільних телефонів і планшетів. Швидка доставка, гарантія якості, доступні ціни.',
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }],
    apple: ['/apple-icon.png'],
  },
};

// 15.2.4

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SWRDevTool>
      <html
        lang="uk-UA"
        className="h-full"
      >
        <body
          className={`${inter.className} flex min-h-full flex-col antialiased
            has-[&_.mobile-nav-menu-viewport>[data-state=open]]:overflow-hidden`}
        >
          {children}
        </body>
      </html>
    </SWRDevTool>
  );
}
