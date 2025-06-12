import type React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-card shadow-sm mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} eCommSim. All rights reserved.</p>
        <p className="text-sm">Designed with <span className="text-primary">&hearts;</span> for learning.</p>
      </div>
    </footer>
  );
};
