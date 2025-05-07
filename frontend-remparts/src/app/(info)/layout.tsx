import { Container } from '@/shared/ui';

export default function LayoutInfo({ children }: { children: React.ReactNode }) {
  return <Container className="pt-2 pb-5 md:pt-5 md:pb-32">{children}</Container>;
}
