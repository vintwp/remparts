import { TableHeader } from '@/shared/ui';

export function DataTableHeader({ ...props }: React.ComponentProps<'thead'>) {
  return <TableHeader {...props} />;
}
