import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex items-center justify-center px-4 py-3 border-t border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-xs text-muted-foreground">
      <span>&copy; {new Date().getFullYear()} Mitchell Simoens. MIT License.</span>
    </footer>
  );
};

export default Footer;
