import React from 'react';
import { cn } from '../../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'bg-surface text-text-primary hover:bg-surface-hover',
  outline: 'border-2 border-border text-text-primary hover:bg-surface-hover',
  ghost: 'text-text-primary hover:bg-surface-hover',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  ...props 
}) => {
  return (
    <button
      className={cn(
        'rounded-full font-medium transition-colors duration-200',
        'focus:outline-none focus:ring-4 focus:ring-primary/30',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};