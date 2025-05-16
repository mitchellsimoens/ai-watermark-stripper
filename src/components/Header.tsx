import React from 'react';

import { ThemeToggle } from '$/components/ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <span className="font-bold text-lg tracking-tight">Invisible Character Stripper</span>
      <ThemeToggle />
    </header>
  );
};

export default Header;
