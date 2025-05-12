
import React, { useState } from 'react';
import { Logo } from '@/components/logo';
import { Welcome } from '@/components/onboarding/welcome';
import { CompanyValues } from '@/components/onboarding/company-values';
import { TeamData } from '@/components/onboarding/team-data';
import { RolesMapping } from '@/components/onboarding/roles-mapping';
import { HiringDna } from '@/components/onboarding/hiring-dna';
import { Calibration } from '@/components/onboarding/calibration';
import { Finalize } from '@/components/onboarding/finalize';
import { ProcessStructure } from '@/components/onboarding/process-structure';
import { Success } from '@/components/onboarding/success';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/language-switcher';

const TOTAL_STEPS = 8;

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useLanguage();

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };
  
  return (
    <div className="min-h-screen bg-fitscore-gray-50 flex flex-col">
      <header className="bg-white p-4 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <LanguageSwitcher />
        </div>
      </header>

      <main className="flex-grow flex flex-col py-8">
        {currentStep === 0 && (
          <Welcome
            onNext={handleNext}
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
          />
        )}
        
        {currentStep === 1 && (
          <CompanyValues
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
          />
        )}
        
        {currentStep === 2 && (
          <TeamData
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
          />
        )}
        
        {currentStep === 3 && (
          <RolesMapping
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
          />
        )}
        
        {currentStep === 4 && (
          <HiringDna
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
          />
        )}
        
        {currentStep === 5 && (
          <Calibration
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
          />
        )}
        
        {currentStep === 6 && (
          <ProcessStructure
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
          />
        )}
        
        {currentStep === 7 && (
          <Finalize
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
          />
        )}
        
        {currentStep === 8 && (
          <Success />
        )}
      </main>
    </div>
  );
};

export default Onboarding;
