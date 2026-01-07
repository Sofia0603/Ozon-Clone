import cn from 'clsx';
import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Field({ className, ...rest }: Props) {
  return (
    <input
      className={cn(
        'w-full border border-transparent transition-colors focus:border-primary px-4 py-2 mb-2',
        className
      )}
      {...rest}
    />
  );
}
