import { Container } from '@/shared/ui';

export default function ApiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Container className="py-5 md:py-12">{children}</Container>;
}
