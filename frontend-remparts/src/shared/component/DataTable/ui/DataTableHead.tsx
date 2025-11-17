import { TableHead } from '@/shared/ui';

export function DataTableHead({ ...props }: React.ComponentProps<'th'>) {
  return <TableHead {...props} />;
}
