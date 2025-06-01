import { Container } from '@/shared/ui';

export default function AuthPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-black/10">
      <Container className="h-screen py-5 md:py-12">{children}</Container>
    </div>
  );
}
