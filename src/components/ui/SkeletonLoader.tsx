'use client';

import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 1, className }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-full h-40 bg-gray-300 rounded animate-pulse" />
      ))}
    </div>
  );
};
