import { cn } from '@/shared/lib/utils';

type Props = {
  text: string;
  className?: string;
};

export function FooterHeading({ text, className }: Props) {
  return <h4 className={cn('md:text-2xl" text-lg font-semibold', className)}>{text}</h4>;
}
