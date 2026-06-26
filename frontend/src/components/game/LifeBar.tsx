import React from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LifeBarProps {
  lives: number;
  maxLives?: number;
}

const LifeBar: React.FC<LifeBarProps> = ({ lives, maxLives = 3 }) => {
  return (
    <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 py-1.5 px-3 rounded-full">
      <span className="text-[10px] uppercase font-bold tracking-wider text-game-muted mr-1">Vies</span>
      <div className="flex gap-1">
        {Array.from({ length: maxLives }).map((_, idx) => {
          const isAlive = idx < lives;
          return (
            <AnimatePresence key={idx} mode="popLayout">
              {isAlive ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0, rotate: 45 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="text-game-error"
                >
                  <Heart className="w-5 h-5 fill-current filter drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 0.2 }}
                  className="text-white/20"
                >
                  <Heart className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
};

export default LifeBar;
