import React from 'react';
import { Container } from '../Container/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-background py-8">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center text-text-secondary md:text-left">
            <p>© {new Date().getFullYear()} MovieCatalog. Все права защищены.</p>
          </div>
          <div className="flex gap-6">
            <a 
              href="#" 
              className="text-text-secondary transition-colors hover:text-primary"
              aria-label="Политика конфиденциальности"
            >
              Политика конфиденциальности
            </a>
            <a 
              href="#" 
              className="text-text-secondary transition-colors hover:text-primary"
              aria-label="Условия использования"
            >
              Условия использования
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};