import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/shared/ui';
import { Triangle } from '@/shared/ui';

import { Menu } from '../types';

type Props = {
  departments: Menu[];
  className?: string;
};

export async function MenuLarge({ departments, className }: Props) {
  return (
    <div className={className}>
      <NavigationMenu
        className="w-full max-w-full justify-start"
        orientation="vertical"
        disableViewport
      >
        <NavigationMenuList className="relative flex-col items-start space-x-0">
          {departments.length === 0
            ? null
            : departments.map(dep => (
                <NavigationMenuItem
                  value={dep.url}
                  key={dep.name}
                  className="border-b-gray w-full border-b-[1px]"
                >
                  <NavigationMenuTrigger
                    className="m-0 flex h-max w-full items-start justify-between gap-4 rounded-none py-3 pr-6 pl-4 font-bold"
                    indicator={
                      <div className="pt-[7px]">
                        <Triangle />
                      </div>
                    }
                  >
                    <span className="text-left">{dep.name}</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="md:w-full">
                    <div className="grid auto-rows-min grid-cols-[repeat(2,minmax(150px,300px))]">
                      {dep.category.map(cat => (
                        <NavigationMenuLink
                          key={cat.name}
                          href={`${dep.url}/${cat.url}`}
                          className="border-gray py-2 underline-offset-2 odd:border-r-[1px] odd:px-3 even:pl-3 hover:underline"
                        >
                          {cat.name}
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
        </NavigationMenuList>
        <div className="absolute top-0 left-full -mt-[6px]">
          <NavigationMenuViewport
            className="min-h-40 rounded-none shadow-none md:w-[calc(100vw-100vw*2/6-21px)]
              xl:w-[calc(calc((80vw-11px)-(100vw-1202px)/2))]"
          />
        </div>
      </NavigationMenu>
    </div>
  );
}
