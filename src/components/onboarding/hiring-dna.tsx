
import React, { useState } from 'react';
import { StepLayout } from './step-layout';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

interface HiringDnaProps {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

interface Trait {
  id: string;
  name: string;
  description: string;
  weight: number;
  selected: boolean;
}

export const HiringDna: React.FC<HiringDnaProps> = ({ onNext, onBack, currentStep, totalSteps }) => {
  const [traits, setTraits] = useState<Trait[]>([
    { 
      id: '1', 
      name: 'Growth Mindset', 
      description: 'Embraces challenges, persists through obstacles, and sees effort as a path to mastery.', 
      weight: 70, 
      selected: true 
    },
    { 
      id: '2', 
      name: 'Initiative', 
      description: 'Proactively identifies and solves problems without being asked to do so.', 
      weight: 80, 
      selected: true 
    },
    { 
      id: '3', 
      name: 'Ownership', 
      description: 'Takes responsibility for their work and outcomes, whether successful or not.', 
      weight: 90, 
      selected: true 
    },
    { 
      id: '4', 
      name: 'Communication', 
      description: 'Clearly and effectively conveys ideas and information to others.', 
      weight: 60, 
      selected: false 
    },
    { 
      id: '5', 
      name: 'Adaptability', 
      description: 'Adjusts quickly and positively to changing conditions and requirements.', 
      weight: 50, 
      selected: false 
    },
    { 
      id: '6', 
      name: 'Collaboration', 
      description: 'Works effectively with others toward shared goals and outcomes.', 
      weight: 75, 
      selected: true 
    },
    { 
      id: '7', 
      name: 'Critical Thinking', 
      description: 'Analyzes information objectively and makes reasoned judgments.', 
      weight: 65, 
      selected: false 
    },
    { 
      id: '8', 
      name: 'Emotional Intelligence', 
      description: 'Recognizes and manages own emotions and understands emotions of others.', 
      weight: 55, 
      selected: true 
    },
  ]);

  const handleToggleTraitSelection = (id: string) => {
    const selectedCount = traits.filter(t => t.selected).length;
    const trait = traits.find(t => t.id === id);
    
    // If trying to deselect when only 5 are selected, don't allow
    if (trait?.selected && selectedCount <= 5) {
      return;
    }
    
    // If trying to select when 5 are already selected, don't allow
    if (!trait?.selected && selectedCount >= 5) {
      return;
    }
    
    setTraits(
      traits.map(t => 
        t.id === id ? { ...t, selected: !t.selected } : t
      )
    );
  };

  const handleWeightChange = (id: string, values: number[]) => {
    setTraits(
      traits.map(t => 
        t.id === id ? { ...t, weight: values[0] } : t
      )
    );
  };

  const selectedTraits = traits.filter(t => t.selected);

  return (
    <StepLayout
      title="Define Your Hiring DNA"
      description="Select the top 5 traits that define your best hires and adjust their importance."
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      onNext={onNext}
    >
      <div className="space-y-6">
        <div className="bg-fitscore-blue-light p-4 rounded-lg text-center">
          <p className="font-medium text-fitscore-blue">
            {selectedTraits.length} of 5 traits selected
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {traits.map(trait => (
            <Card 
              key={trait.id} 
              className={`p-4 cursor-pointer transition-all duration-200 ${
                trait.selected 
                  ? 'border-fitscore-blue shadow-md' 
                  : 'border-fitscore-gray-200'
              }`}
              onClick={() => handleToggleTraitSelection(trait.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{trait.name}</h3>
                <div className={`h-5 w-5 rounded-full border ${
                  trait.selected 
                    ? 'bg-fitscore-blue border-fitscore-blue' 
                    : 'border-fitscore-gray-300'
                } flex items-center justify-center`}>
                  {trait.selected && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
              <p className="text-sm text-fitscore-gray-500 mb-4">
                {trait.description}
              </p>
              
              {trait.selected && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Importance</span>
                    <span className="font-medium">{trait.weight}%</span>
                  </div>
                  <Slider
                    defaultValue={[trait.weight]} 
                    min={0} 
                    max={100} 
                    step={5}
                    onValueChange={(values) => handleWeightChange(trait.id, values)}
                    className="w-full"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </StepLayout>
  );
};
