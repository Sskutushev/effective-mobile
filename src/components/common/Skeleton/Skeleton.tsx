import React from 'react';
import { cn } from '../../../utils/cn';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'animate-shimmer rounded-lg bg-gradient-to-r from-surface via-surface-hover to-surface',
        'bg-[length:1000px_100%]',
        className
      )}
    />
  );
};