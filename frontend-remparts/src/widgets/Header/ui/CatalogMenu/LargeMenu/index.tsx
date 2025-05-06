import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  Triangle,
} from '@/shared/ui';
import { Menu } from '../../../types';
import { PopoverRoot } from './PopoverRoot';

type Props = {
  departments: Menu[];
};

export function LargeMenu({ departments }: Props) {
  const createCategoryColumns = (items: Menu[], itemsPerRow: number = 4) => {
    if (items.length === 0) {
      return [];
    }

    const data = [...items].map(dep => {
      const catsCopy = [...dep.category];
      const cats = [];

      while (catsCopy.length) cats.push(catsCopy.splice(0, itemsPerRow));

      return {
        ...dep,
        category: cats,
      };
    });

    return data;
  };

  const departmentsToRender = createCategoryColumns(departments, 8);

  return (
    <div className="relative flex items-center gap-2 text-xl">
      <PopoverRoot>
        <NavigationMenu
          className="w-full max-w-full justify-start"
          orientation="vertical"
          disableViewport
        >
          <NavigationMenuList className="-ml0 relative flex-col items-start space-x-0">
            {departmentsToRender.length === 0
              ? null
              : departmentsToRender.map(dep => (
                  <NavigationMenuItem
                    value={dep.url}
                    key={dep.name}
                    className="border-b-gray w-full border-b-[1px]"
                  >
                    <NavigationMenuTrigger
                      className="m-0 flex h-max w-full items-start justify-between gap-4 rounded-none py-3 pr-6 pl-2 font-bold"
                      indicator={
                        <div className="pt-[7px]">
                          <Triangle />
                        </div>
                      }
                    >
                      <span className="text-left">{dep.name}</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="h-full md:w-full">
                      <div className="flex h-full py-3">
                        {dep.category.map((col, idx) => (
                          <div
                            key={`col-${idx}-${dep.url}`}
                            className="border-gray flex basis-1/2 flex-col gap-2 [&:not(:last-child)]:justify-between
                              [&:not(:last-child)]:border-r-[1px]"
                          >
                            {col.map(cat => (
                              <NavigationMenuLink
                                key={`col-cat-${cat.name}`}
                                href={`.././${dep.url}/${cat.url}`}
                                className="px-4 underline-offset-2 hover:underline"
                              >
                                {cat.name}
                              </NavigationMenuLink>
                            ))}
                          </div>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
          </NavigationMenuList>
          <div className="absolute top-0 left-full -mt-[6px] h-full bg-emerald-200 [&>div]:top-0 [&>div]:h-full">
            <NavigationMenuViewport
              className="min-h-full rounded-none shadow-none md:w-[calc(100vw*9/12-12px)]
                [@media(min-width:1202px)]:w-[calc(1202px*9/12-10px)]"
            />
          </div>
        </NavigationMenu>
      </PopoverRoot>
    </div>
  );
}
