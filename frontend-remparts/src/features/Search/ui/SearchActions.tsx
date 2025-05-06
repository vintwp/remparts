import { Button } from '@/shared/ui';
import { SearchIcon, X } from 'lucide-react';

type Props = {
  onClick: () => void;
  isEmpty: boolean;
};

export function SearchActions({ onClick, isEmpty }: Props) {
  return (
    <div className="absolute top-1/2 right-2 h-[18px] w-[18px] -translate-y-1/2">
      <Button
        variant="ghost"
        className="hover:text-primary-alt h-full w-full hover:bg-transparent has-[>svg]:p-0"
        onClick={onClick}
        asChild
      >
        <div className="h-full w-full">
          {!isEmpty ? (
            <X
              size={18}
              strokeWidth={1.75}
            />
          ) : (
            <SearchIcon
              size={18}
              strokeWidth={1.75}
            />
          )}
        </div>
      </Button>
    </div>
  );
}
