import { Container } from '@/shared/ui';

export default function DepartmentSlugLayout({ children }: { children: React.ReactNode }) {
  return <Container className="pt-2 pb-5 md:pt-5 md:pb-10">{children}</Container>;
}
