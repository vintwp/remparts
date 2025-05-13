'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Input, Label } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';

type FormInputContext = {
  id: string;
  setId: (id: string) => void;
};

const FormInputContext = createContext<FormInputContext | null>(null);

function useFormInput() {
  const context = useContext(FormInputContext);

  if (!context) {
    throw new Error('useFormInput must be used within <FormInput>');
  }
  return context;
}

function FormInputRoot({ children }: { children: React.ReactNode }) {
  const generatedId = useId();
  const [id, setId] = useState<string>(generatedId);

  const value = useMemo(
    () => ({
      id,
      setId,
    }),
    [id, setId],
  );

  return (
    <FormInputContext.Provider value={value}>
      <div className="space-y-2">{children}</div>
    </FormInputContext.Provider>
  );
}

function FormInputInput({
  onChange,
  onBlur,
  value,
  placeholder,
  error = false,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange?: (v: string) => void;
  value?: string;
  error?: boolean;
}) {
  const [val, setVal] = useState<string>(value || '');
  const [prevVal, setPrevVal] = useState<string>(value || '');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { id } = useFormInput();

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyPressed = e.key;

    if (keyPressed === 'Escape') {
      setVal(prevVal);
      if (onChange) {
        onChange(prevVal);
      }

      inputRef.current?.blur();
    }

    if (keyPressed === 'Enter') {
      setPrevVal(val);
    }
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (val !== prevVal) {
      setPrevVal(val);
    }

    if (onBlur) {
      onBlur(e);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  useEffect(() => {
    if (value || value === '') {
      setVal(value);
    }
  }, [value]);

  return (
    <Input
      {...props}
      className={cn(error && 'border-red-400')}
      value={val}
      onChange={handleOnChange}
      onKeyDown={handleKeydown}
      onBlur={handleOnBlur}
      ref={inputRef}
      placeholder={placeholder}
      id={id}
    />
  );
}

function FormInputLabel({ children }: { children: React.ReactNode }) {
  const { id } = useFormInput();
  return <Label htmlFor={id}>{children}</Label>;
}

function FormInputError({ error }: { error: string | undefined }) {
  return error ? <p className="mt-2 px-1 text-xs text-red-400">{error}</p> : null;
}

export { FormInputRoot, FormInputInput, FormInputLabel, FormInputError };
