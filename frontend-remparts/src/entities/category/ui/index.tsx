import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import { Category } from '@/shared/types';
import { DOMAIN } from '@/shared/config';
import { Button } from '@/shared/ui';
import Link from 'next/link';

type Props = {
  category: Category;
  departmentUrl: string;
};

export function CategoryCard({ category, departmentUrl }: Props) {
  return (
    <div
      key={`category-${category.name}`}
      className={cn(
        'group relative shrink-0 grow-0 basis-1/2 cursor-pointer px-1 md:basis-1/3 lg:basis-1/4',
      )}
    >
      <div className="flex h-[100px] w-full items-center justify-center overflow-hidden bg-gray-50 md:h-[150px]">
        <div className="relative h-[calc(100%-16px)] w-[calc(100%-16px)]">
          <Image
            src={`${DOMAIN}/${category.image}`}
            alt={category.name}
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
      <Button
        variant="link"
        asChild
        className={cn(
          'flex h-max w-full flex-col gap-0 text-center whitespace-normal',
          'block after:absolute after:inset-0 after:content-[""]',
        )}
      >
        <Link
          href={`${departmentUrl}/${category.url}`}
          className="text-sm"
        >
          {category.name}
        </Link>
      </Button>
    </div>
  );
}
