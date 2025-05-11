
import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProgressBar } from './progress-bar';

interface StepLayoutProps {
  title: string;
  description: string;
  currentStep: number;
  totalSteps: number;
  children: ReactNode;
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  disableNext?: boolean;
}

export const StepLayout: React.FC<StepLayoutProps> = ({
  title,
  description,
  currentStep,
  totalSteps,
  children,
  onBack,
  onNext,
  nextLabel = "Continue",
  disableNext = false,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 md:px-0 flex flex-col">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <Card className="p-8 shadow-lg border-0 rounded-xl opacity-0 animate-fade-in">
        <h2 className="text-2xl font-bold mb-2 opacity-0 animate-slide-up step-animation-delay-1">{title}</h2>
        <p className="text-fitscore-gray-500 mb-6 opacity-0 animate-slide-up step-animation-delay-2">{description}</p>
        
        <div className="opacity-0 animate-slide-up step-animation-delay-3">
          {children}
        </div>
        
        <div className="flex justify-between mt-10 opacity-0 animate-slide-up step-animation-delay-4">
          {onBack ? (
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <Button onClick={onNext} disabled={disableNext}>
            {nextLabel}
          </Button>
        </div>
      </Card>
    </div>
  );
};
