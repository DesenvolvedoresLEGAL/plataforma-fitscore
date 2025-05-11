
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white p-4 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>Dashboard</Button>
            <Button onClick={() => navigate('/onboarding')}>Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center">
        <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-fitscore-blue-light text-fitscore-blue rounded-full text-sm font-medium">
              Company Customization Module
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold">
              Customize FitScore™ for your company's unique DNA
            </h1>
            
            <p className="text-lg text-fitscore-gray-500">
              Personalize the FitScore™ hiring algorithm using your internal data to find candidates 
              who truly match your culture and performance expectations.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="text-md"
                onClick={() => navigate('/onboarding')}
              >
                Start Customization
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-md"
                onClick={() => navigate('/dashboard')}
              >
                View Demo Dashboard
              </Button>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-fitscore-blue-light to-fitscore-blue/10 rounded-2xl p-8 md:p-12 flex items-center justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/80 shadow-lg flex items-center justify-center">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-r from-fitscore-blue to-fitscore-purple flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl md:text-7xl font-bold">87</div>
                    <div className="text-lg md:text-xl font-medium mt-2">FitScore™</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-0 -right-4 bg-white rounded-lg shadow-md p-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-fitscore-green"></div>
                <span className="text-sm font-medium">Culture Match</span>
              </div>
              
              <div className="absolute bottom-10 -left-8 bg-white rounded-lg shadow-md p-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-fitscore-blue"></div>
                <span className="text-sm font-medium">Skills Alignment</span>
              </div>
              
              <div className="absolute bottom-0 right-12 bg-white rounded-lg shadow-md p-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-fitscore-purple"></div>
                <span className="text-sm font-medium">Growth Potential</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-fitscore-gray-50 py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center text-fitscore-gray-500 text-sm">
            &copy; 2025 FitScore™ | All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
