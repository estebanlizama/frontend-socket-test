import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  className, 
  glass = false, 
  children, 
  ...props 
}) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200 bg-white p-4 shadow-sm',
        glass && 'bg-white/70 backdrop-blur-md border-white/20',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
