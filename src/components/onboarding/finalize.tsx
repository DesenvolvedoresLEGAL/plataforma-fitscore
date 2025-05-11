
import React from 'react';
import { StepLayout } from './step-layout';
import { Check } from 'lucide-react';

interface FinalizeProps {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const Finalize: React.FC<FinalizeProps> = ({ onNext, onBack, currentStep, totalSteps }) => {
  return (
    <StepLayout
      title="Finalize & Launch"
      description="Review your FitScore™ customization and get ready to launch your personalized hiring algorithm."
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      onNext={onNext}
      nextLabel="Activate FitScore™ Engine"
    >
      <div className="space-y-8">
        <div className="text-center py-8">
          <div className="mx-auto w-20 h-20 bg-fitscore-blue-light rounded-full flex items-center justify-center mb-6">
            <Check className="h-10 w-10 text-fitscore-blue" />
          </div>
          
          <h3 className="text-xl font-medium mb-2">Configuration Complete!</h3>
          <p className="text-fitscore-gray-500 max-w-md mx-auto">
            Your FitScore™ engine is ready to be activated. This will create a custom AI model based on your inputs.
          </p>
        </div>

        <div className="bg-fitscore-gray-50 p-6 rounded-lg">
          <h4 className="font-medium text-lg mb-4">Summary</h4>
          
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <span className="text-fitscore-gray-500">Company Values</span>
              <span className="font-medium">5 values defined</span>
            </div>
            
            <div className="flex justify-between py-2 border-b">
              <span className="text-fitscore-gray-500">Historic Team Data</span>
              <span className="font-medium">3 employees processed</span>
            </div>
            
            <div className="flex justify-between py-2 border-b">
              <span className="text-fitscore-gray-500">Roles Mapped</span>
              <span className="font-medium">1 role configured</span>
            </div>
            
            <div className="flex justify-between py-2 border-b">
              <span className="text-fitscore-gray-500">Key Traits Defined</span>
              <span className="font-medium">5 traits weighted</span>
            </div>
            
            <div className="flex justify-between py-2">
              <span className="text-fitscore-gray-500">Algorithm Calibration</span>
              <span className="font-medium">3 profiles evaluated</span>
            </div>
          </div>
        </div>

        <div className="bg-fitscore-blue-light p-4 rounded-lg">
          <p className="text-center text-fitscore-blue font-medium">
            After activation, your FitScore™ engine will be ready to evaluate new candidates within 15 minutes.
          </p>
        </div>
      </div>
    </StepLayout>
  );
};
