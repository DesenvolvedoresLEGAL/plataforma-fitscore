
import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full flex items-center gap-2 mb-12 opacity-80">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div 
            className={`progress-step ${currentStep > index ? 'completed' : ''} ${currentStep === index ? 'active' : ''}`}
          >
            {currentStep > index ? (
              <Check className="w-4 h-4" />
            ) : (
              index + 1
            )}
          </div>
          {index < totalSteps - 1 && (
            <div 
              className={`progress-line ${currentStep > index ? 'completed' : ''}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
