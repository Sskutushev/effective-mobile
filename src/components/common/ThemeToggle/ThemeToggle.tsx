import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { Button } from '../Button/Button';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      variant="ghost"
      size="md"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Переключить на темную тему' : 'Переключить на светлую тему'}
      className="rounded-full p-2 hover:bg-surface-hover"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-text-primary" />
      ) : (
        <Sun className="h-5 w-5 text-text-primary" />
      )}
    </Button>
  );
};