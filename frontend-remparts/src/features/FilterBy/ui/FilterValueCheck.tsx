import { Checkbox } from '@/shared/ui';

type Props = {
  id: number;
  value: string;
  checked: boolean;
  onCheck: (id: number) => void;
};

export function FilterValueCheck({ id, value, checked, onCheck }: Props) {
  const handleCheck = () => {
    onCheck(id);
  };

  return (
    <div className="hover:text-primary-alt flex items-center space-x-2">
      <Checkbox
        id={value}
        className="data-[state=checked]:bg-primary-alt cursor-pointer"
        checked={checked}
        onCheckedChange={handleCheck}
      />
      <label
        htmlFor={value}
        className="cursor-pointer text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {value}
      </label>
    </div>
  );
}
