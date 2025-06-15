import { AccountSidebar } from '@/widgets/(Account)/Sidebar';
import { AccountTitle } from '@/widgets/(Account)/Title';

import { cn } from '@/shared/lib/utils';

type Props = {
  children: React.ReactNode;
};
export default async function AccountLayout({ children }: Props) {
  return (
    <div>
      <AccountTitle className="mb-3" />
      <div
        className={cn(
          '[&>div]:rounded-sm [&>div]:border-0',
          'flex flex-col gap-2 md:flex-row md:[&>div]:border-[1px]',
        )}
      >
        <div className="basis-full md:basis-1/6 md:p-2">
          <AccountSidebar />
        </div>
        <div className="basis-full p-2 md:basis-5/6">{children}</div>
      </div>
    </div>
  );
}
