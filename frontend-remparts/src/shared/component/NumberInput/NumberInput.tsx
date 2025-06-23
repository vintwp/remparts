'use client';

import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

import { useEffectAfterMount } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import { Button, Input } from '@/shared/ui';

type Props = {
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
};

export function NumberInput({ defaultValue = 1, min = 1, max = 99, onChange, className }: Props) {
  const [value, setValue] = useState<number>(defaultValue);

  const handleOnAdd = () => {
    if (value >= max) {
      return;
    }
    setValue(currentValue => currentValue + 1);
  };

  const handleOnSub = () => {
    if (value <= min) {
      return;
    }
    setValue(currentValue => currentValue - 1);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;

    if (!value && value !== 0) {
      return;
    }

    setValue(value || 1);
  };

  useEffectAfterMount(() => {
    if (onChange === undefined) {
      return;
    }

    onChange(value);
  }, [value]);

  return (
    <div className={cn('flex gap-0.5', className)}>
      <Button
        variant="outline"
        className="size-auto py-0 has-[>svg]:px-1"
        onClick={() => handleOnSub()}
      >
        <Minus />
      </Button>
      <Input
        value={value}
        className="h-6 max-w-12 p-0 text-center md:h-8 md:text-lg"
        onChange={handleInput}
      />

      <Button
        variant="outline"
        className="size-auto py-0 has-[>svg]:px-1"
        onClick={handleOnAdd}
      >
        <Plus />
      </Button>
    </div>
  );
}
