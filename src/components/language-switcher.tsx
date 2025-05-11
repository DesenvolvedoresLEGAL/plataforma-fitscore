
import React from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'pt-BR' ? 'en-US' : 'pt-BR';
    setLanguage(newLanguage);
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage}
      className="flex gap-2 items-center"
    >
      <span className="font-medium">{language === 'pt-BR' ? 'EN' : 'PT'}</span>
      <div className="w-5 h-5 rounded-full overflow-hidden">
        <img 
          src={language === 'pt-BR' ? '/usa-flag.svg' : '/brazil-flag.svg'} 
          alt={language === 'pt-BR' ? 'English' : 'Português'} 
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = language === 'pt-BR' ? '🇺🇸' : '🇧🇷';
          }}
        />
      </div>
    </Button>
  );
};
