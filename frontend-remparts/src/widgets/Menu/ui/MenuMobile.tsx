import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button } from '@/shared/ui';
import { Menu } from '../types';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';

type Props = {
  departments: Menu[];
  className?: string;
};

export async function MenuMobile({ departments, className }: Props) {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn('w-full', className)}
    >
      {departments.length === 0
        ? null
        : departments.map(dep => (
            <AccordionItem
              key={dep.name}
              value={`${dep.id}`}
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
                      <Link href={`${dep.url}/${cat.url}`}>{cat.name}</Link>
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
    </Accordion>
  );
}
