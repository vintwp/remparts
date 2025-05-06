'use client';

import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/ui';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

type Props = {
  title: string;
  defaultClosed?: boolean;
  children?: React.ReactNode;
};

function SidebarCollapsible({ title, defaultClosed = false, children }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(!defaultClosed);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2 px-4 py-2 text-wrap"
    >
      <div className="flex items-center justify-between space-x-4">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer p-0 text-center has-[>svg]:p-0"
          >
            <h4 className="text-base font-bold uppercase">{title}</h4>
            {!isOpen ? <Plus /> : <Minus />}
          </Button>
        </CollapsibleTrigger>
      </div>
      <ul className="space-y-2">
        <CollapsibleContent
          className="space-y-2"
          animated
        >
          {children}
        </CollapsibleContent>
      </ul>
    </Collapsible>
  );
}

function SidebarCollapsibleItem({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <Button
        variant="link"
        asChild
        className="h-min p-0 font-light whitespace-normal text-black"
      >
        {children}
      </Button>
    </li>
  );
}

export { SidebarCollapsible, SidebarCollapsibleItem };
