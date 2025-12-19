import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';
import { ThemeToggle } from '../../common/ThemeToggle/ThemeToggle';
import { Container } from '../Container/Container';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Film className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">MovieCatalog</span>
          </Link>

          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
};