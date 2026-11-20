import React from 'react';

interface ProgressBarProps {
  percentage: number;
  showText?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, showText = true, className = '' }) => {
  const clamped = Math.min(100, Math.max(0, percentage));

  return (
    <div className={`w-full ${className}`}>
      {showText && (
        <div className="flex justify-between text-xs text-[#ffd8a2]/80 mb-1.5 font-medium">
          <span>Course Completion</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#ffd8a2] via-[#c99e64] to-[#ffd8a2] transition-all duration-500 rounded-full"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
