import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LifeBarProps {
  lives: number;
  maxLives?: number;
}

const LifeBar: React.FC<LifeBarProps> = ({ lives, maxLives = 3 }) => {
  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/5 py-1.5 px-3.5 rounded-full select-none">
      <span className="text-[8px] uppercase font-bold tracking-[0.15em] text-game-muted mr-1.5">Division Vies</span>
      <div className="flex gap-2">
        {Array.from({ length: maxLives }).map((_, idx) => {
          const isAlive = idx < lives;
          return (
            <div key={idx} className="w-4 h-4 flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                {isAlive ? (
                  <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 45 }}
                    exit={{ scale: 0, rotate: 135 }}
                    transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                    className="w-2 h-2 bg-game-primary border border-game-primary/35 shadow-[0_0_6px_rgba(197,168,128,0.3)]"
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0.3, rotate: 45 }}
                    animate={{ opacity: 0.15, rotate: 45 }}
                    className="w-2 h-2 border border-white/30 bg-transparent"
                  />
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LifeBar;
