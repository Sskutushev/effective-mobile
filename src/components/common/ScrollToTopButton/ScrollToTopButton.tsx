import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScroll } from '../../../hooks/useScroll';
import { Button } from '../Button/Button';

export const ScrollToTopButton: React.FC = () => {
  const isScrolled = useScroll(200);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="rounded-full p-4 shadow-lg"
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
