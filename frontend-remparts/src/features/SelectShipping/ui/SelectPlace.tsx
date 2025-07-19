'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { Place } from '@/entities/shipping';

import { Overlay } from '@/shared/component';
import { cn } from '@/shared/lib';
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui';

type Props = {
  places: Place[];
  selectedPlace: Place | undefined;
  onSelectPlace: (place: Place) => void;
  onChangePlaceName: (v: string) => void;
  placeholder?: string;
  placeholderNotFound?: string;
  disabled?: boolean;
  className?: string;
};

export function SelectPlace({
  places,
  selectedPlace,
  onSelectPlace,
  onChangePlaceName,
  placeholder = 'Оберіть місце',
  placeholderNotFound = 'Місце не знайдено',
  disabled,
  className,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelect = (area: Place) => {
    setOpen(false);

    onSelectPlace(area);
  };

  const handleChangePlaceName = useDebouncedCallback(v => {
    setLoading(true);
    onChangePlaceName(v);
  }, 500);

  useEffect(() => {
    setLoading(false);
  }, [places]);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('min-w-[150px] justify-between', className)}
          disabled={disabled}
        >
          <span className="truncate">
            {selectedPlace
              ? places?.find(place => place.id === selectedPlace.id)?.name
              : placeholder}
          </span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            className="h-9"
            onValueChange={handleChangePlaceName}
          />
          <CommandList>
            <CommandEmpty>{placeholderNotFound}</CommandEmpty>
            <CommandGroup>
              {places?.map(place => (
                <CommandItem
                  key={place.id}
                  value={place.name}
                  onSelect={() => handleSelect(place)}
                >
                  {place.name}
                  <Check
                    className={cn(
                      'ml-auto',
                      selectedPlace?.id === place.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            {loading && (
              <Overlay
                className="rounded-sm"
                loading
              />
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
