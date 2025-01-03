import React from 'react';

interface TimerRingProps {
  duration: number;
  timeLeft: number;
}

const TimerRing: React.FC<TimerRingProps> = ({ duration, timeLeft }) => {
  const radius = 48;
  const stroke = 1.5;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (timeLeft / duration) * circumference;

  // Determine color based on time remaining percentage
  const pct = timeLeft / duration;
  let strokeColor = 'stroke-game-primary'; // Gold (>50%)
  if (pct <= 0.3) {
    strokeColor = 'stroke-game-error'; // Crimson (<30%)
  } else if (pct <= 0.6) {
    strokeColor = 'stroke-game-warning'; // Burnt Orange (30%-60%)
  }

  return (
    <div className="relative flex items-center justify-center w-28 h-28 select-none">
      <svg className="w-full h-full -rotate-90">
        {/* Background Circle */}
        <circle
          className="stroke-game-border"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress Circle */}
        <circle
          className={`transition-all duration-100 ease-linear ${strokeColor}`}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      {/* Timer Text */}
      <span className="absolute text-3xl font-mono font-bold text-game-text tracking-tighter">
        {Math.max(0, Math.ceil(timeLeft))}
      </span>
    </div>
  );
};

export default TimerRing;
