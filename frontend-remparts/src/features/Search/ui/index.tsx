'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Spinner,
} from '@/shared/ui';

import { getSearch } from '../api';
import { TSearch } from '../types';

import { SearchActions } from './SearchActions';

export function Search() {
  const router = useRouter();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<TSearch | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const createPath = (value: string) => {
    const params = new URLSearchParams();
    params.set('query', value);
    return params.toString();
  };

  const handleClickActionButton = () => {
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

      router.push(`/search?${createPath(searchQuery)}`);

      setSearchQuery('');
      setSearchResult(null);

      if (triggerRef.current) {
        triggerRef.current.blur();
      }

      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const handleFocusInput = () => {
    if (searchResult) {
      setPopoverOpen(true);
    }
  };

  const handleBlurInput = () => {
    setPopoverOpen(false);
  };

  const handleClickSearchResult = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const url = e.currentTarget.getAttribute('href');

    if (triggerRef.current) {
      triggerRef.current.blur();
    }

    if (inputRef.current) {
      inputRef.current.blur();
    }

    router.push(url || '/');

    setSearchQuery('');
    setSearchResult(null);
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
      <PopoverTrigger
        className="w-full focus-visible:ring-1 focus-visible:outline-0"
        ref={triggerRef}
      >
        <div className="relative">
          <Input
            className="h-7 w-full cursor-text bg-white p-0 pr-7 pl-2 text-sm"
            placeholder="Введіть назву товару або його код"
            onChange={e => setSearchQuery(e.target.value)}
            ref={inputRef}
            value={searchQuery}
            onBlur={handleBlurInput}
            onKeyDown={handleKeyDown}
            onFocus={handleFocusInput}
          />
          <SearchActions
            isEmpty={searchQuery.length === 0}
            onClick={handleClickActionButton}
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
                  onClick={handleClickSearchResult}
                >
                  {result.name}
                </Link>
              </Button>
            ))}
            <Separator />
            {searchResult.pagination.total > 1 && (
              <Button
                variant="link"
                className="line-clamp-1 justify-start truncate px-4 py-2 text-black/70"
                asChild
              >
                <Link
                  href={`/search?${createPath(searchQuery)}`}
                  className="block"
                  onClick={handleClickSearchResult}
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
