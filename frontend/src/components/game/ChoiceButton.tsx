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
  let borderClass = 'border-white/10 hover:border-game-primary/50 bg-white/5';
  let textClass = 'text-game-text';
  let prefixBg = 'bg-white/10 text-game-muted';
  let glowClass = '';

  if (correct === true) {
    borderClass = 'border-game-success bg-game-success/15';
    textClass = 'text-game-success font-semibold';
    prefixBg = 'bg-game-success text-game-bg';
    glowClass = 'shadow-[0_0_15px_rgba(34,197,94,0.3)]';
  } else if (correct === false && selected) {
    borderClass = 'border-game-error bg-game-error/15';
    textClass = 'text-game-error font-semibold';
    prefixBg = 'bg-game-error text-game-bg';
    glowClass = 'shadow-[0_0_15px_rgba(239,68,68,0.3)]';
  } else if (selected) {
    borderClass = 'border-game-primary bg-game-primary/20';
    prefixBg = 'bg-game-primary text-game-text';
    glowClass = 'shadow-[0_0_15px_rgba(124,58,237,0.3)]';
  }

  // Shake animation for incorrect answer
  const shakeAnimation = correct === false && selected ? {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  } : {};

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      animate={shakeAnimation}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`relative w-full min-h-[58px] py-3.5 px-4 rounded-2xl flex items-center text-left border transition-all duration-200 cursor-pointer focus:outline-none ${borderClass} ${glowClass}`}
    >
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold mr-3.5 shrink-0 transition-colors duration-200 ${prefixBg}`}>
        {correct === true && selected ? <Check className="w-4 h-4" /> : 
         correct === false && selected ? <X className="w-4 h-4" /> : prefix}
      </div>
      <span className={`text-[15px] font-medium leading-tight select-none ${textClass}`}>
        {text}
      </span>
    </motion.button>
  );
};

export default ChoiceButton;
