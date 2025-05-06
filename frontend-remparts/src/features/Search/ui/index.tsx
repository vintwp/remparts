/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import Link from 'next/link';
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Spinner,
} from '@/shared/ui';
import { Item } from '@/shared/types';
import { getSearch } from '../api';
import { TSearch } from '../types';
import { SearchActions } from './SearchActions';
import { useRouter } from 'next/navigation';
import { createURLSearchParams } from '@/shared/hooks';

type Props = {};

export function Search({}: Props) {
  const router = useRouter();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<TSearch | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const createPath = (value: string) => {
    const params = new URLSearchParams();
    params.set('query', value);
    return params.toString();
  };

  const handleActionButtonClick = () => {
    if (searchQuery.length > 0) {
      setSearchQuery('');
      setSearchResult(null);
    }
    setPopoverOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setPopoverOpen(false);
      router.push(`/search?q=${searchQuery}`);
    }
  };

  useEffect(() => {
    if (debouncedSearchQuery) {
      setIsLoading(true);
      setSearchResult(null);
      setPopoverOpen(true);

      getSearch(debouncedSearchQuery)
        .then(data => {
          if (data.ok) {
            setSearchResult(data.data);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [debouncedSearchQuery]);

  return (
    <Popover open={popoverOpen}>
      <PopoverTrigger className="w-full">
        <div className="relative">
          <Input
            className="h-7 w-full cursor-text bg-white p-0 pr-7 pl-2 text-sm"
            placeholder="Введіть назву товару або його код"
            onChange={e => setSearchQuery(e.target.value)}
            value={searchQuery}
            onBlur={() => setPopoverOpen(false)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (searchResult) {
                setPopoverOpen(true);
              }
            }}
          />
          <SearchActions
            isEmpty={searchQuery.length === 0}
            onClick={handleActionButtonClick}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={e => e.preventDefault()}
        className="w-screen rounded-none p-0 sm:w-[var(--radix-popover-trigger-width)] sm:rounded-sm"
        onBlur={() => setPopoverOpen(false)}
      >
        {isLoading && <Spinner className="text-black/50" />}

        {searchResult && searchResult.items.length > 0 && (
          <div className="flex flex-col">
            {searchResult.items.slice(0, 11).map(result => (
              <Button
                key={result.name}
                variant="link"
                className="line-clamp-1 justify-start truncate text-black/70"
                asChild
              >
                <Link
                  href={`/search?query=${result.id}`}
                  className="block"
                >
                  {result.name}
                </Link>
              </Button>
            ))}
            <Separator />
            {searchResult.pagination.total > 10 && (
              <Button
                variant="link"
                className="line-clamp-1 justify-start truncate px-4 py-2 text-black/70"
                asChild
              >
                <Link
                  href={`../search?${createPath(searchQuery)}`}
                  className="block"
                >
                  Показати всі результати
                </Link>
              </Button>
            )}
          </div>
        )}
        {searchResult && searchResult.pagination.total === 0 && (
          <p className="px-4 py-2">За вашим запитом нічого не знайдено</p>
        )}
      </PopoverContent>
    </Popover>
  );
}
