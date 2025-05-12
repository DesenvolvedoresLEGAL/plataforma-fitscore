
import React from 'react';
import { StepLayout } from './step-layout';
import { Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FinalizeProps {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const Finalize: React.FC<FinalizeProps> = ({ onNext, onBack, currentStep, totalSteps }) => {
  const { t } = useLanguage();
  
  return (
    <StepLayout
      title={t('onboarding.finalize.title')}
      description={t('onboarding.finalize.description')}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      onNext={onNext}
      nextLabel={t('onboarding.finalize.activateButton')}
    >
      <div className="space-y-8">
        <div className="text-center py-8">
          <div className="mx-auto w-20 h-20 bg-fitscore-blue-light rounded-full flex items-center justify-center mb-6">
            <Check className="h-10 w-10 text-fitscore-blue" />
          </div>
          
          <h3 className="text-xl font-medium mb-2">{t('onboarding.finalize.configComplete')}</h3>
          <p className="text-fitscore-gray-500 max-w-md mx-auto">
            {t('onboarding.finalize.configDescription')}
          </p>
        </div>

        <div className="bg-fitscore-gray-50 p-6 rounded-lg">
          <h4 className="font-medium text-lg mb-4">{t('onboarding.finalize.summary')}</h4>
          
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <span className="text-fitscore-gray-500">{t('onboarding.finalize.companyValues')}</span>
              <span className="font-medium">5 {t('onboarding.finalize.valuesCount')}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b">
              <span className="text-fitscore-gray-500">{t('onboarding.finalize.teamData')}</span>
              <span className="font-medium">3 {t('onboarding.finalize.employeesProcessed')}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b">
              <span className="text-fitscore-gray-500">{t('onboarding.finalize.rolesMapped')}</span>
              <span className="font-medium">1 {t('onboarding.finalize.rolesConfigured')}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b">
              <span className="text-fitscore-gray-500">{t('onboarding.finalize.keyTraits')}</span>
              <span className="font-medium">5 {t('onboarding.finalize.traitsWeighted')}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b">
              <span className="text-fitscore-gray-500">{t('onboarding.finalize.calibration')}</span>
              <span className="font-medium">3 {t('onboarding.finalize.profilesEvaluated')}</span>
            </div>
            
            <div className="flex justify-between py-2">
              <span className="text-fitscore-gray-500">{t('onboarding.finalize.processStructure')}</span>
              <span className="font-medium">1 {t('onboarding.finalize.processConfigured')}</span>
            </div>
          </div>
        </div>

        <div className="bg-fitscore-blue-light p-4 rounded-lg">
          <p className="text-center text-fitscore-blue font-medium">
            {t('onboarding.finalize.activationNote')}
          </p>
        </div>
      </div>
    </StepLayout>
  );
};
