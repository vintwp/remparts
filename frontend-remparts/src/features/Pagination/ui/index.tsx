'use client';

import { cn } from '@/shared/lib/utils';
import { buildPaginationArray } from '../lib';
import {
  Pagination as PaginationBody,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui';
import { useCustomSearchParams } from '@/shared/hooks';

type Props = {
  currentPage: number;
  lastPage: number;
};

function PaginationPageButton({
  targetPage,
  currentPage,
  targetUrl,
}: {
  targetPage: number;
  currentPage: number;
  targetUrl: string;
}) {
  return (
    <PaginationItem>
      <PaginationLink
        href={targetUrl}
        isActive={targetPage === currentPage}
        aria-disabled
        className={cn(targetPage === currentPage && 'pointer-events-none')}
      >
        {targetPage}
      </PaginationLink>
    </PaginationItem>
  );
}

export function Pagination({ currentPage, lastPage }: Props) {
  const SEARCH_PARAMETER = 'page';
  const { createPath } = useCustomSearchParams(SEARCH_PARAMETER);

  const renderButtons = () => {
    if (lastPage <= 5) {
      return Array.from({ length: lastPage }).map((_, idx) => (
        <PaginationPageButton
          key={`page-${idx}`}
          targetPage={idx + 1}
          targetUrl={createPath(idx === 0 ? 0 : idx + 1)}
          currentPage={currentPage}
        />
      ));
    }

    const buildedArrayPages = buildPaginationArray(currentPage, lastPage);

    return buildedArrayPages.map((number, idx) => {
      if (!number) {
        return (
          <PaginationItem key={`page-${idx}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      return (
        <PaginationPageButton
          key={`page-${idx}`}
          targetPage={number}
          targetUrl={createPath(idx === 0 ? 0 : idx + 1)}
          currentPage={currentPage}
        />
      );
    });
  };

  return (
    <PaginationBody>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage <= 1}
            href={createPath(currentPage - 1)}
            text="Назад"
            className={cn(currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined)}
          />
        </PaginationItem>
        {renderButtons()}
        <PaginationItem>
          <PaginationNext
            aria-disabled={currentPage >= lastPage}
            href={createPath(currentPage + 1)}
            text="Далі"
            className={cn(currentPage >= lastPage ? 'pointer-events-none opacity-50' : undefined)}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationBody>
  );
}
