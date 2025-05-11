
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StepLayout } from './step-layout';
import { X } from 'lucide-react';

interface CompanyValuesProps {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

const predefinedValues = [
  "Innovation", "Transparency", "Customer Focus", "Diversity", "Excellence", 
  "Integrity", "Teamwork", "Accountability", "Growth Mindset", "Ownership",
  "Passion", "Quality", "Respect", "Trust", "Adaptability"
];

export const CompanyValues: React.FC<CompanyValuesProps> = ({ onNext, onBack, currentStep, totalSteps }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [customValue, setCustomValue] = useState('');

  const addValue = (value: string) => {
    if (value && !selectedValues.includes(value)) {
      setSelectedValues([...selectedValues, value]);
      setCustomValue('');
    }
  };

  const removeValue = (value: string) => {
    setSelectedValues(selectedValues.filter(v => v !== value));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && customValue) {
      e.preventDefault();
      addValue(customValue);
    }
  };

  return (
    <StepLayout
      title="Company Values & Culture"
      description="Select values that best represent your company culture. These will help calibrate the FitScore™ algorithm."
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      onNext={onNext}
      disableNext={selectedValues.length === 0}
    >
      <div className="space-y-6">
        <div>
          <label className="block font-medium mb-2">Select core company values</label>
          <div className="tag-input-container">
            {selectedValues.map(value => (
              <div key={value} className="tag-item">
                <span>{value}</span>
                <button
                  type="button"
                  onClick={() => removeValue(value)}
                  className="ml-1 text-fitscore-blue hover:text-fitscore-blue-dark"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <Input
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a value and press Enter..."
              className="flex-grow border-none focus:ring-0 p-0 min-w-[150px] text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Suggested values</label>
          <div className="flex flex-wrap gap-2">
            {predefinedValues.filter(value => !selectedValues.includes(value)).map(value => (
              <Button
                key={value}
                variant="outline"
                size="sm"
                onClick={() => addValue(value)}
                className="rounded-full"
              >
                {value}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Company culture description (optional)</label>
          <Textarea 
            placeholder="Briefly describe your company's culture, mission, or any unique aspects..."
            className="min-h-[100px]"
          />
        </div>
      </div>
    </StepLayout>
  );
};
