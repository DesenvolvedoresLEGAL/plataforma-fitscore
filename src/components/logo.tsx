
import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <div className="w-8 h-8 rounded-md bg-gradient-to-r from-fitscore-blue to-fitscore-purple flex items-center justify-center text-white font-bold text-lg">
        F
      </div>
      <div className="font-bold text-xl">
        Fit<span className="text-fitscore-blue">Score</span>™
      </div>
    </div>
  );
};
