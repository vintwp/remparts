'use client';

import { Category } from '@/shared/types';
import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/ui';
import { Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  title: string;
  categories: Category[];
  departmentUrl: string;
  initiallyDisplayed?: number;
};

export function SidebarCategoriesList({
  title,
  categories,
  departmentUrl,
  initiallyDisplayed = 5,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        {categories.slice(0, initiallyDisplayed).map(cat => (
          <li key={cat.url}>
            <Button
              variant="link"
              asChild
              className="h-min p-0 font-light whitespace-normal text-black"
            >
              <Link href={`/${departmentUrl}/${cat.url}`}>{cat.name}</Link>
            </Button>
          </li>
        ))}
        {!isOpen ? <li>...</li> : null}
        <CollapsibleContent
          className="space-y-2"
          animated
        >
          {categories.slice(initiallyDisplayed).map(cat => (
            <li key={cat.url}>
              <Button
                variant="link"
                asChild
                className="h-min p-0 font-light whitespace-normal text-black"
              >
                <Link href={`/${departmentUrl}/${cat.url}`}>{cat.name}</Link>
              </Button>
            </li>
          ))}
        </CollapsibleContent>
      </ul>
    </Collapsible>
  );
}
