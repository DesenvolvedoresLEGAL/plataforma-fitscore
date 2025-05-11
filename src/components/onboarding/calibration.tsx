
import React, { useState } from 'react';
import { StepLayout } from './step-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

interface CalibrationProps {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

interface CandidateProfile {
  id: string;
  name: string;
  position: string;
  education: string;
  experience: string;
  skills: string[];
  fitScore: number;
  feedback?: 'agree' | 'disagree';
}

export const Calibration: React.FC<CalibrationProps> = ({ onNext, onBack, currentStep, totalSteps }) => {
  const [candidates, setCandidates] = useState<CandidateProfile[]>([
    {
      id: '1',
      name: 'Candidate A',
      position: 'Software Engineer',
      education: 'BS Computer Science',
      experience: '5 years in SaaS companies',
      skills: ['JavaScript', 'React', 'Node.js', 'Testing', 'Agile'],
      fitScore: 87
    },
    {
      id: '2',
      name: 'Candidate B',
      position: 'Software Engineer',
      education: 'MS Information Technology',
      experience: '3 years in E-commerce',
      skills: ['Python', 'Django', 'SQL', 'API Design'],
      fitScore: 73
    },
    {
      id: '3',
      name: 'Candidate C',
      position: 'Software Engineer',
      education: 'Self-taught',
      experience: '8 years in startups',
      skills: ['JavaScript', 'Vue.js', 'Express', 'MongoDB'],
      fitScore: 65
    }
  ]);
  
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const currentCandidate = candidates[currentCandidateIndex];
  
  const handleFeedback = (feedback: 'agree' | 'disagree') => {
    const updatedCandidates = [...candidates];
    updatedCandidates[currentCandidateIndex] = {
      ...currentCandidate,
      feedback
    };
    
    setCandidates(updatedCandidates);
    
    if (currentCandidateIndex < candidates.length - 1) {
      setCurrentCandidateIndex(currentCandidateIndex + 1);
    }
  };
  
  const allRated = candidates.every(candidate => candidate.feedback);
  
  return (
    <StepLayout
      title="Calibration Test"
      description="Let's calibrate the FitScore™ algorithm by evaluating some sample candidate profiles."
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      onNext={onNext}
      disableNext={!allRated}
    >
      <div className="space-y-6">
        <Card className="p-6 border shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-medium">{currentCandidate.name}</h3>
              <p className="text-fitscore-gray-500">{currentCandidate.position}</p>
            </div>
            <div className="bg-fitscore-blue-light px-4 py-2 rounded-md flex flex-col items-center">
              <span className="text-xs font-medium text-fitscore-blue">FitScore™</span>
              <span className="text-2xl font-bold text-fitscore-blue">{currentCandidate.fitScore}</span>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <div>
              <h4 className="text-sm font-medium text-fitscore-gray-600">Education</h4>
              <p>{currentCandidate.education}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-fitscore-gray-600">Experience</h4>
              <p>{currentCandidate.experience}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-fitscore-gray-600">Skills</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {currentCandidate.skills.map((skill, index) => (
                  <div key={index} className="bg-fitscore-gray-100 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {currentCandidate.feedback ? (
            <div className={`p-4 rounded-md ${
              currentCandidate.feedback === 'agree' 
                ? 'bg-green-50 text-green-800' 
                : 'bg-orange-50 text-orange-800'
            }`}>
              <p className="text-center font-medium">
                {currentCandidate.feedback === 'agree' 
                  ? 'You agreed with this score' 
                  : 'You disagreed with this score'}
              </p>
              
              {currentCandidateIndex < candidates.length - 1 && (
                <div className="flex justify-center mt-4">
                  <Button 
                    variant="secondary" 
                    onClick={() => setCurrentCandidateIndex(currentCandidateIndex + 1)}
                    className="text-sm"
                  >
                    Next Candidate
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="text-center mb-4">Do you agree with this FitScore™ assessment?</p>
              <div className="flex justify-center gap-4">
                <Button 
                  variant="outline"
                  className="border-green-500 text-green-600 hover:bg-green-50"
                  onClick={() => handleFeedback('agree')}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Agree
                </Button>
                <Button 
                  variant="outline"
                  className="border-orange-500 text-orange-600 hover:bg-orange-50"
                  onClick={() => handleFeedback('disagree')}
                >
                  <X className="w-4 h-4 mr-2" />
                  Disagree
                </Button>
              </div>
            </div>
          )}
        </Card>
        
        <div className="flex justify-center">
          <div className="flex gap-2">
            {candidates.map((candidate, index) => (
              <div 
                key={candidate.id} 
                className={`w-2 h-2 rounded-full ${
                  index === currentCandidateIndex 
                    ? 'bg-fitscore-blue' 
                    : candidate.feedback 
                      ? 'bg-fitscore-gray-400' 
                      : 'bg-fitscore-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-sm text-center text-fitscore-gray-500">
          {currentCandidateIndex + 1} of {candidates.length} candidate profiles
        </div>
      </div>
    </StepLayout>
  );
};
