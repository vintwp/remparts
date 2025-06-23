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
      <div className={cn('flex flex-col gap-2 md:flex-row')}>
        <div className="basis-full md:basis-1/6 [&>div]:rounded-sm md:[&>div]:border-[1px]">
          <AccountSidebar />
        </div>
        <div className="relative basis-full rounded-sm border-[1px] p-2 md:basis-5/6">
          {children}
        </div>
      </div>
    </div>
  );
}
