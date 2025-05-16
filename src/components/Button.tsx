import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { cn } from '$/lib/utils';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          variant === 'primary'
            ? 'bg-foreground text-background hover:bg-muted'
            : 'bg-muted text-foreground border border-input hover:bg-accent',
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
