import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/shared/ui';
import { MobileMenuRoot } from './MobileMenuRoot';
import { MobileMenuContent } from './MobileMenuContent';
import { MobileMenuTrigger } from './MobileMenuTrigger';
import { Menu } from '../../../types';
import Link from 'next/link';

type Props = {
  departments: Menu[];
};

export function MobileMenu({ departments }: Props) {
  return (
    <MobileMenuRoot>
      <NavigationMenuList>
        <NavigationMenuItem>
          <MobileMenuTrigger />
          <MobileMenuContent>
            <Accordion
              type="single"
              collapsible
              className={'w-full'}
            >
              {departments.length === 0
                ? null
                : departments.map(dep => (
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
                              <Link href={`.././${dep.url}/${cat.url}`}>{cat.name}</Link>
                            </Button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
            </Accordion>
          </MobileMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </MobileMenuRoot>
  );
}
