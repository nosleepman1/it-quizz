import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface ChoiceButtonProps {
  text: string;
  index: number;
  selected: boolean;
  correct: boolean | null; // true = is correct answer, false = is incorrect and selected, null = no feedback yet
  disabled: boolean;
  onClick: () => void;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  text,
  index,
  selected,
  correct,
  disabled,
  onClick
}) => {
  const letters = ['A', 'B', 'C', 'D'];
  const prefix = letters[index] || '?';

  // Determine classes based on response status
  let borderClass = 'border-game-border bg-game-card hover:border-game-primary/30 hover:bg-game-input';
  let textClass = 'text-game-text';
  let prefixBg = 'bg-game-input text-game-muted border border-game-border';
  let glowClass = '';

  if (correct === true) {
    borderClass = 'border-game-success/40 bg-game-success/5';
    textClass = 'text-game-success font-semibold';
    prefixBg = 'bg-game-success/10 text-game-success border border-game-success/20';
    glowClass = 'shadow-[0_2px_12px_rgba(16,185,129,0.06)]';
  } else if (correct === false && selected) {
    borderClass = 'border-game-error/40 bg-game-error/5';
    textClass = 'text-game-error font-semibold';
    prefixBg = 'bg-game-error/10 text-game-error border border-game-error/20';
    glowClass = 'shadow-[0_2px_12px_rgba(225,29,72,0.06)]';
  } else if (selected) {
    borderClass = 'border-game-primary bg-game-primary/5';
    prefixBg = 'bg-game-primary/25 text-game-primary border border-game-primary/35';
    glowClass = 'shadow-[0_2px_12px_rgba(197,168,128,0.06)]';
  }

  // Shake animation for incorrect answer
  const shakeAnimation = correct === false && selected ? {
    x: [0, -6, 6, -6, 6, 0],
    transition: { duration: 0.35 }
  } : {};

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      animate={shakeAnimation}
      whileTap={{ scale: disabled ? 1 : 0.99 }}
      className={`relative w-full min-h-[54px] py-3 px-4 rounded-xl flex items-center text-left border transition-all duration-300 cursor-pointer focus:outline-none ${borderClass} ${glowClass}`}
    >
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold mr-3.5 shrink-0 transition-all duration-300 ${prefixBg}`}>
        {correct === true && selected ? <Check className="w-3.5 h-3.5" /> : 
         correct === false && selected ? <X className="w-3.5 h-3.5" /> : prefix}
      </div>
      <span className={`text-xs font-medium leading-relaxed select-none ${textClass}`}>
        {text}
      </span>
    </motion.button>
  );
};

export default ChoiceButton;
