
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Success: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-16 md:px-0 flex flex-col items-center text-center">
      <div className="w-28 h-28 rounded-full bg-gradient-to-r from-fitscore-blue to-fitscore-blue-dark flex items-center justify-center mb-8">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold mb-4 animate-slide-up">Success!</h1>
      <p className="text-xl text-fitscore-gray-600 max-w-lg mb-8 animate-slide-up step-animation-delay-1">
        Your custom FitScore™ engine has been activated and is now being trained with your data.
      </p>
      
      <div className="w-full max-w-md bg-fitscore-gray-50 p-6 rounded-lg mb-10 animate-slide-up step-animation-delay-2">
        <h3 className="font-medium mb-2">What happens next?</h3>
        <ul className="space-y-2 text-left text-fitscore-gray-600">
          <li className="flex items-start">
            <span className="flex-shrink-0 w-5 h-5 bg-fitscore-blue-light rounded-full flex items-center justify-center mr-2 mt-0.5">
              <span className="text-fitscore-blue text-xs font-bold">1</span>
            </span>
            <span>Your AI model is now being trained (10-15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-5 h-5 bg-fitscore-blue-light rounded-full flex items-center justify-center mr-2 mt-0.5">
              <span className="text-fitscore-blue text-xs font-bold">2</span>
            </span>
            <span>You'll receive an email when FitScore™ is ready to use</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-5 h-5 bg-fitscore-blue-light rounded-full flex items-center justify-center mr-2 mt-0.5">
              <span className="text-fitscore-blue text-xs font-bold">3</span>
            </span>
            <span>Start scoring candidates through the dashboard or API</span>
          </li>
        </ul>
      </div>
      
      <Button onClick={() => navigate('/dashboard')} className="animate-slide-up step-animation-delay-3">
        Go to Dashboard
      </Button>
    </div>
  );
};
