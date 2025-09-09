import Link from 'next/link';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button } from '@/shared/ui';

import { Menu } from '../../../types';

import { MobileMenuRoot } from './MobileMenuRoot';

type Props = {
  departments: Menu[];
};

export function MobileMenu({ departments }: Props) {
  return (
    <MobileMenuRoot>
      <Accordion
        type="single"
        collapsible
        className={'w-full'}
      >
        {departments.length &&
          departments.map(
            dep =>
              dep.isVisible && (
                <AccordionItem
                  key={dep.name}
                  value={`mobile-menu-accordion-item-${dep.id}`}
                >
                  <AccordionTrigger className="cursor-pointer py-3 pr-6 pl-4 leading-[1.5] font-bold">
                    {dep.name}
                  </AccordionTrigger>
                  <AccordionContent className="pr-6 pl-4">
                    <div className="flex flex-col items-start">
                      {dep.category.map(cat => (
                        <Button
                          key={cat.name}
                          variant="link"
                          className="h-max leading-[1.5] whitespace-normal"
                          asChild
                        >
                          <Link href={`/${dep.url}/${cat.url}`}>{cat.name}</Link>
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ),
          )}
      </Accordion>
    </MobileMenuRoot>
  );
}
