import { cn } from '@/utils/cn';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export function Button({
  children,
  className,
  variant = 'primary',
  isDisabled = false,
  ...rest
}: Props) {
  return (
    <button
      className={cn(
        'bg-primary text-white hover:bg-blue-800 px-4 py-2 rounded font-semibold',
        {
          'opacity-50 cursur-not-allowed': isDisabled,
          'bg-transparent text-foreground': variant === 'secondary',
        },
        className
      )}
      {...rest}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
