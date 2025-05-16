'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

export const ThemeToggle: React.FC = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="rounded-full p-2 border border-border bg-card hover:bg-accent transition-colors"
      onClick={handleToggle}
    >
      {mounted ? (
        resolvedTheme === 'dark' ? (
          <Sun size={20} aria-hidden />
        ) : (
          <Moon size={20} aria-hidden />
        )
      ) : null}
    </button>
  );
};
