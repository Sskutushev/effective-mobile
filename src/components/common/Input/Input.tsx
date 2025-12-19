import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'w-full rounded-lg border-2 border-border bg-surface px-4 py-2 text-text-primary',
          'transition-all duration-200 placeholder:text-text-secondary',
          'focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';