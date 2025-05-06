'use client';

import { Button, Input } from '@/shared/ui';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

type Props = {
  onChange: (value: string) => void;
};

export function FilterInput({ onChange }: Props) {
  const [query, setQuery] = useState<string>('');

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onChange(e.target.value);
  };

  const handleClearInput = () => {
    setQuery('');
    onChange('');
  };

  return (
    <div className="relative">
      <Search
        width={20}
        height={20}
        className="absolute top-1/2 left-3 -translate-y-1/2"
      />
      <Input
        className="peer rounded-xs bg-white pr-8 pl-10 md:text-base"
        onChange={handleOnChangeInput}
        placeholder="..."
        value={query}
      />
      <Button
        variant="ghost"
        className="text-additional absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 cursor-pointer
          peer-placeholder-shown:opacity-0 hover:bg-transparent"
        onClick={handleClearInput}
      >
        <X
          width={20}
          height={20}
        />
      </Button>
    </div>
  );
}
