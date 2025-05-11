
import React from 'react';
import { Logo } from '../logo';
import { Button } from '@/components/ui/button';
import { Bell, Settings, User } from 'lucide-react';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useLanguage } from '@/contexts/LanguageContext';

export const DashboardHeader: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <header className="border-b bg-white p-4">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <Logo />
        
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
