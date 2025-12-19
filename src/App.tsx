import { ThemeProvider } from './context/ThemeContext';
import { AppRouter } from './router';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-text-primary transition-colors duration-300">
        <AppRouter />
      </div>
    </ThemeProvider>
  );
}

export default App;
