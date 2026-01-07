'use client';

import { cn } from '@/utils/cn';
import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 1, className }) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn('w-full h-10 bg-gray-300 rounded animate-pulse mb-4', className)}
        />
      ))}
    </div>
  );
};
