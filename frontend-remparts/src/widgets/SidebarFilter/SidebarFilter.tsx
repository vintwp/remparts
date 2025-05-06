'use client';
import { FilterBy } from '@/features';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Separator,
} from '@/shared/ui';
import { X } from 'lucide-react';
import { CategoryExtened } from '@/entities/category';

type Props = {
  categoryOptions: CategoryExtened;
};

export function SidebarFilter({ categoryOptions }: Props) {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button
          size="sm"
          className="bg-primary-alt hover:bg-primary-alt/80 rounded-sm"
        >
          Фільтри
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-neutral-50 data-[vaul-drawer-direction=left]:w-11/12">
        <DrawerHeader className="flex flex-row justify-end px-3 py-1">
          <DrawerTitle className="hidden">Category Filters</DrawerTitle>
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
            >
              <X />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div>
          <FilterBy
            showCommand
            title="Бренд"
            searchParameter="brand"
            filterProperties={categoryOptions.brand}
          />
          <div className="my-3 px-4">
            <Separator />
          </div>
          {categoryOptions.quality.length ? (
            <>
              <FilterBy
                title="Якість"
                searchParameter="quality"
                filterProperties={categoryOptions.quality}
              />
            </>
          ) : null}
          {categoryOptions.complianceWith.length ? (
            <>
              <FilterBy
                title="Сумісно з"
                searchParameter="complianceWith"
                filterProperties={categoryOptions.complianceWith}
              />
            </>
          ) : null}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
