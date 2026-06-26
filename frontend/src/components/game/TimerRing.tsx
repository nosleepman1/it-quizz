import React from 'react';

interface TimerRingProps {
  duration: number;
  timeLeft: number;
}

const TimerRing: React.FC<TimerRingProps> = ({ duration, timeLeft }) => {
  const radius = 34;
  const stroke = 5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (timeLeft / duration) * circumference;

  // Determine color based on time remaining percentage
  const pct = timeLeft / duration;
  let strokeColor = 'stroke-game-secondary'; // Cyan (>50%)
  if (pct <= 0.25) {
    strokeColor = 'stroke-game-error'; // Red (<25%)
  } else if (pct <= 0.5) {
    strokeColor = 'stroke-game-warning'; // Yellow (25%-50%)
  }

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <svg className="w-full h-full -rotate-90">
        {/* Background Circle */}
        <circle
          className="stroke-white/5"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Glowing Progress Circle */}
        <circle
          className={`transition-all duration-1000 ease-linear ${strokeColor}`}
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
      <span className="absolute text-2xl font-mono font-black text-game-text tracking-tighter">
        {Math.max(0, Math.ceil(timeLeft))}
      </span>
    </div>
  );
};

export default TimerRing;
