import React from 'react';

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => (
  <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8">{children}</main>
);

export default Main;
