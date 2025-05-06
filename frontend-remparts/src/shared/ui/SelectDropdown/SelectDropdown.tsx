import { cn } from '@/shared/lib/utils';

export type TOption = {
  label: string;
  value: string;
};

type Props = {
  options: TOption[];
  defaultValue: TOption['label'];
  label: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
};

export function SelectDropdown({ options, defaultValue, onChange, label, className }: Props) {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <label
        htmlFor={label}
        className="hidden text-sm leading-none font-medium text-gray-900 md:block dark:text-white"
      >
        {label}
      </label>
      <select
        id={label}
        className="focus:ring-primary-alt focus:border-primary-alt block h-[30px] w-[55px] cursor-pointer rounded-sm
          border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {options.map(option => (
          <option
            key={option.label}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
