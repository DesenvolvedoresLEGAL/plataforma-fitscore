
import React from 'react';
import { StepLayout } from './step-layout';

interface WelcomeProps {
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

export const Welcome: React.FC<WelcomeProps> = ({ onNext, currentStep, totalSteps }) => {
  return (
    <StepLayout
      title="Welcome to FitScore™ Customization"
      description="Let's personalize your hiring algorithm to match your company's unique DNA. This setup will take less than 10 minutes."
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={onNext}
      nextLabel="Start Customization"
    >
      <div className="flex flex-col items-center justify-center gap-8 py-8">
        <div className="w-40 h-40 rounded-full bg-fitscore-blue-light flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-fitscore-blue to-fitscore-purple flex items-center justify-center text-white">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        
        <div className="text-center max-w-md">
          <h3 className="text-lg font-medium mb-2">How does this work?</h3>
          <p className="text-fitscore-gray-500">
            We'll guide you through customizing your FitScore™ algorithm based on your company values, team data, and hiring preferences. The more information you provide, the better FitScore™ will identify your ideal candidates.
          </p>
        </div>
      </div>
    </StepLayout>
  );
};
