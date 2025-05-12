
import React, { useState } from 'react';
import { StepLayout } from './step-layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProcessStructureProps {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const ProcessStructure: React.FC<ProcessStructureProps> = ({ 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}) => {
  const { t } = useLanguage();
  const [processName, setProcessName] = useState('');
  const [vacancyType, setVacancyType] = useState('');
  const [selectedStages, setSelectedStages] = useState({
    screening: true,
    virtual: true,
    inPerson: true
  });
  const [weights, setWeights] = useState({
    screening: 20,
    virtual: 40,
    inPerson: 40
  });
  const [recordingLink, setRecordingLink] = useState('');
  const [generateQuestions, setGenerateQuestions] = useState(true);
  
  const handleStageChange = (stage: keyof typeof selectedStages, checked: boolean) => {
    setSelectedStages(prev => ({
      ...prev,
      [stage]: checked
    }));
    
    // Recalculate weights if a stage is deselected
    if (!checked) {
      const activeStagesCount = Object.values(selectedStages).filter(Boolean).length - 1;
      if (activeStagesCount > 0) {
        const remainingWeight = weights[stage];
        const weightPerRemaining = remainingWeight / activeStagesCount;
        
        setWeights(prev => {
          const newWeights = {...prev, [stage]: 0};
          Object.keys(selectedStages).forEach(key => {
            const stageKey = key as keyof typeof selectedStages;
            if (stageKey !== stage && selectedStages[stageKey]) {
              newWeights[stageKey] += weightPerRemaining;
            }
          });
          return newWeights;
        });
      }
    } else {
      // Recalculate weights if a stage is selected
      const activeStagesCount = Object.values(selectedStages).filter(Boolean).length + 1;
      const equalWeight = 100 / activeStagesCount;
      
      setWeights(prev => {
        const newWeights = {...prev};
        Object.keys(selectedStages).forEach(key => {
          const stageKey = key as keyof typeof selectedStages;
          if (stageKey === stage || selectedStages[stageKey]) {
            newWeights[stageKey] = equalWeight;
          }
        });
        return newWeights;
      });
    }
  };
  
  const handleWeightChange = (stage: keyof typeof weights, value: number) => {
    // Ensure weights always sum to 100
    const diff = value - weights[stage];
    const activeStages = Object.keys(selectedStages).filter(
      key => selectedStages[key as keyof typeof selectedStages] && key !== stage
    );
    
    if (activeStages.length > 0) {
      const adjustmentPerStage = diff / activeStages.length * -1;
      
      setWeights(prev => {
        const newWeights = {...prev, [stage]: value};
        activeStages.forEach(key => {
          const stageKey = key as keyof typeof weights;
          newWeights[stageKey] -= adjustmentPerStage;
        });
        return newWeights;
      });
    }
  };
  
  const isDisabled = !processName || !vacancyType || 
    !Object.values(selectedStages).some(Boolean);
  
  return (
    <StepLayout
      title={t('onboarding.processStructure.title')}
      description={t('onboarding.processStructure.description')}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      onNext={onNext}
      disableNext={isDisabled}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="process-name">{t('onboarding.processStructure.processName')}</Label>
            <Input 
              id="process-name" 
              value={processName} 
              onChange={(e) => setProcessName(e.target.value)} 
              placeholder={t('onboarding.processStructure.processNamePlaceholder')} 
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="vacancy-type">{t('onboarding.processStructure.vacancyType')}</Label>
            <Select value={vacancyType} onValueChange={setVacancyType}>
              <SelectTrigger id="vacancy-type">
                <SelectValue placeholder={t('onboarding.processStructure.selectVacancyType')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">{t('onboarding.processStructure.fullTime')}</SelectItem>
                <SelectItem value="part-time">{t('onboarding.processStructure.partTime')}</SelectItem>
                <SelectItem value="contract">{t('onboarding.processStructure.contract')}</SelectItem>
                <SelectItem value="internship">{t('onboarding.processStructure.internship')}</SelectItem>
                <SelectItem value="temporary">{t('onboarding.processStructure.temporary')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium text-lg">{t('onboarding.processStructure.activeStages')}</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="screening" 
                checked={selectedStages.screening}
                onCheckedChange={(checked) => handleStageChange('screening', checked as boolean)}
              />
              <Label htmlFor="screening">{t('onboarding.processStructure.automaticScreening')}</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="virtual" 
                checked={selectedStages.virtual}
                onCheckedChange={(checked) => handleStageChange('virtual', checked as boolean)}
              />
              <Label htmlFor="virtual">{t('onboarding.processStructure.virtualAIChat')}</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="inPerson" 
                checked={selectedStages.inPerson}
                onCheckedChange={(checked) => handleStageChange('inPerson', checked as boolean)}
              />
              <Label htmlFor="inPerson">{t('onboarding.processStructure.inPersonInterview')}</Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="font-medium text-lg">{t('onboarding.processStructure.stageWeights')}</h3>
          
          {selectedStages.screening && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>{t('onboarding.processStructure.screening')}</Label>
                <span>{Math.round(weights.screening)}%</span>
              </div>
              <Slider
                value={[weights.screening]}
                min={5}
                max={90}
                step={5}
                onValueChange={([value]) => handleWeightChange('screening', value)}
                disabled={!selectedStages.screening}
              />
            </div>
          )}
          
          {selectedStages.virtual && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>{t('onboarding.processStructure.virtual')}</Label>
                <span>{Math.round(weights.virtual)}%</span>
              </div>
              <Slider
                value={[weights.virtual]}
                min={5}
                max={90}
                step={5}
                onValueChange={([value]) => handleWeightChange('virtual', value)}
                disabled={!selectedStages.virtual}
              />
            </div>
          )}
          
          {selectedStages.inPerson && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>{t('onboarding.processStructure.inPerson')}</Label>
                <span>{Math.round(weights.inPerson)}%</span>
              </div>
              <Slider
                value={[weights.inPerson]}
                min={5}
                max={90}
                step={5}
                onValueChange={([value]) => handleWeightChange('inPerson', value)}
                disabled={!selectedStages.inPerson}
              />
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="recording-link">{t('onboarding.processStructure.recordingLink')}</Label>
          <Input 
            id="recording-link" 
            value={recordingLink} 
            onChange={(e) => setRecordingLink(e.target.value)} 
            placeholder={t('onboarding.processStructure.recordingLinkPlaceholder')} 
          />
          <p className="text-sm text-fitscore-gray-500">
            {t('onboarding.processStructure.recordingLinkHint')}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Switch
            id="generate-questions"
            checked={generateQuestions}
            onCheckedChange={setGenerateQuestions}
          />
          <Label htmlFor="generate-questions">
            {t('onboarding.processStructure.generateQuestions')}
          </Label>
        </div>
        
        {generateQuestions && (
          <div className="bg-fitscore-blue-light p-4 rounded-lg">
            <p className="text-fitscore-blue text-sm">
              {t('onboarding.processStructure.questionsGenerationInfo')}
            </p>
          </div>
        )}
      </div>
    </StepLayout>
  );
};
