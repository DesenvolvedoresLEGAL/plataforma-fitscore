
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the available languages
export type Language = 'pt-BR' | 'en-US';

// Define the language context type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create the context with default values
export const LanguageContext = createContext<LanguageContextType>({
  language: 'pt-BR',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Define the props for the LanguageProvider component
interface LanguageProviderProps {
  children: React.ReactNode;
}

// Create the LanguageProvider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize language from localStorage or default to pt-BR
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'pt-BR';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || translations['en-US'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Define the translations
const translations: Record<Language, Record<string, string>> = {
  'pt-BR': {
    // General
    'app.name': 'FitScore™',
    'app.tagline': 'Personalize o algoritmo FitScore™ para o DNA único da sua empresa',
    'app.description': 'Personalize o algoritmo de contratação FitScore™ usando seus dados internos para encontrar candidatos que realmente correspondam à sua cultura e expectativas de desempenho.',
    'app.copyright': '© 2025 FitScore™ | Todos os direitos reservados',
    
    // Navigation and actions
    'nav.dashboard': 'Painel',
    'nav.getStarted': 'Começar',
    'nav.startCustomization': 'Iniciar Personalização',
    'nav.viewDemoDashboard': 'Ver Painel Demonstrativo',
    'nav.recalibrateModel': 'Recalibrar Modelo',
    'nav.scoreNewCandidate': 'Avaliar Novo Candidato',
    
    // Dashboard
    'dashboard.title': 'Painel FitScore™',
    'dashboard.subtitle': 'Acompanhe e analise as pontuações de adequação dos candidatos',
    'dashboard.candidatesScored': 'Candidatos Avaliados',
    'dashboard.last30days': 'Últimos 30 dias',
    'dashboard.averageFitScore': 'FitScore Médio',
    'dashboard.allCandidates': 'Todos os candidatos',
    'dashboard.highFitCandidates': 'Candidatos de Alta Adequação',
    'dashboard.scoreAbove': 'Pontuação > 80',
    'dashboard.candidatesHired': 'Candidatos Contratados',
    'dashboard.scoreDistribution': 'Distribuição de Pontuação',
    'dashboard.weeklyTrends': 'Tendências Semanais',
    
    // Onboarding
    'onboarding.welcome.title': 'Bem-vindo ao FitScore™',
    'onboarding.welcome.description': 'Vamos personalizar seu algoritmo FitScore™ para encontrar candidatos que realmente se encaixam na cultura da sua empresa.',
    'onboarding.welcome.getStarted': 'Começar',
    
    'onboarding.companyValues.title': 'Valores e Cultura da Empresa',
    'onboarding.companyValues.description': 'Selecione os valores que melhor representam a cultura da sua empresa. Isso ajudará a calibrar o algoritmo FitScore™.',
    'onboarding.companyValues.selectCore': 'Selecione os valores principais da empresa',
    'onboarding.companyValues.typeValue': 'Digite um valor e pressione Enter...',
    'onboarding.companyValues.suggested': 'Valores sugeridos',
    'onboarding.companyValues.description.label': 'Descrição da cultura da empresa (opcional)',
    'onboarding.companyValues.description.placeholder': 'Descreva brevemente a cultura da sua empresa, missão ou quaisquer aspectos únicos...',
    
    'onboarding.teamData.title': 'Dados da Equipe',
    
    'onboarding.rolesMapping.title': 'Mapeamento de Funções',
    
    'onboarding.hiringDna.title': 'Defina Seu DNA de Contratação',
    'onboarding.hiringDna.description': 'Selecione os 5 principais traços que definem suas melhores contratações e ajuste sua importância.',
    'onboarding.hiringDna.traitsSelected': 'de 5 traços selecionados',
    'onboarding.hiringDna.importance': 'Importância',
    
    'onboarding.calibration.title': 'Teste de Calibração',
    'onboarding.calibration.description': 'Vamos calibrar o algoritmo FitScore™ avaliando alguns perfis de candidatos de amostra.',
    'onboarding.calibration.agree': 'Você concorda com esta avaliação FitScore™?',
    'onboarding.calibration.agreeButton': 'Concordo',
    'onboarding.calibration.disagreeButton': 'Discordo',
    'onboarding.calibration.agreedMessage': 'Você concordou com esta pontuação',
    'onboarding.calibration.disagreedMessage': 'Você discordou desta pontuação',
    'onboarding.calibration.nextCandidate': 'Próximo Candidato',
    'onboarding.calibration.candidateProfiles': 'perfis de candidatos',
    
    'onboarding.finalize.title': 'Finalizar e Lançar',
    'onboarding.finalize.description': 'Revise sua personalização do FitScore™ e prepare-se para lançar seu algoritmo de contratação personalizado.',
    'onboarding.finalize.configComplete': 'Configuração Completa!',
    'onboarding.finalize.configDescription': 'Seu motor FitScore™ está pronto para ser ativado. Isso criará um modelo de IA personalizado com base em suas entradas.',
    'onboarding.finalize.summary': 'Resumo',
    'onboarding.finalize.companyValues': 'Valores da Empresa',
    'onboarding.finalize.valuesCount': 'valores definidos',
    'onboarding.finalize.teamData': 'Dados Históricos da Equipe',
    'onboarding.finalize.employeesProcessed': 'funcionários processados',
    'onboarding.finalize.rolesMapped': 'Funções Mapeadas',
    'onboarding.finalize.rolesConfigured': 'função configurada',
    'onboarding.finalize.keyTraits': 'Traços-Chave Definidos',
    'onboarding.finalize.traitsWeighted': 'traços ponderados',
    'onboarding.finalize.calibration': 'Calibração do Algoritmo',
    'onboarding.finalize.profilesEvaluated': 'perfis avaliados',
    'onboarding.finalize.activationNote': 'Após a ativação, seu motor FitScore™ estará pronto para avaliar novos candidatos em 15 minutos.',
    'onboarding.finalize.activateButton': 'Ativar Motor FitScore™',
    
    'onboarding.success.title': 'Sucesso!',
    
    // Common terms
    'common.next': 'Próximo',
    'common.back': 'Voltar',
    'common.of': 'de',
    
    // Traits
    'trait.growthMindset': 'Mentalidade de Crescimento',
    'trait.growthMindset.description': 'Abraça desafios, persiste diante de obstáculos e vê o esforço como um caminho para o domínio.',
    'trait.initiative': 'Iniciativa',
    'trait.initiative.description': 'Identifica e resolve problemas proativamente sem ser solicitado.',
    'trait.ownership': 'Senso de Propriedade',
    'trait.ownership.description': 'Assume responsabilidade pelo seu trabalho e resultados, sejam bem-sucedidos ou não.',
    'trait.communication': 'Comunicação',
    'trait.communication.description': 'Comunica ideias e informações de forma clara e eficaz aos outros.',
    'trait.adaptability': 'Adaptabilidade',
    'trait.adaptability.description': 'Ajusta-se rápido e positivamente a mudanças de condições e requisitos.',
    'trait.collaboration': 'Colaboração',
    'trait.collaboration.description': 'Trabalha efetivamente com outros em direção a objetivos e resultados compartilhados.',
    'trait.criticalThinking': 'Pensamento Crítico',
    'trait.criticalThinking.description': 'Analisa informações objetivamente e faz julgamentos fundamentados.',
    'trait.emotionalIntelligence': 'Inteligência Emocional',
    'trait.emotionalIntelligence.description': 'Reconhece e gerencia as próprias emoções e compreende as emoções dos outros.',
    
    // Company values
    'value.innovation': 'Inovação',
    'value.transparency': 'Transparência',
    'value.customerFocus': 'Foco no Cliente',
    'value.diversity': 'Diversidade',
    'value.excellence': 'Excelência',
    'value.integrity': 'Integridade',
    'value.teamwork': 'Trabalho em Equipe',
    'value.accountability': 'Responsabilidade',
    'value.growthMindset': 'Mentalidade de Crescimento',
    'value.ownership': 'Senso de Propriedade',
    'value.passion': 'Paixão',
    'value.quality': 'Qualidade',
    'value.respect': 'Respeito',
    'value.trust': 'Confiança',
    'value.adaptability': 'Adaptabilidade',
  },
  'en-US': {
    // General
    'app.name': 'FitScore™',
    'app.tagline': 'Customize FitScore™ for your company\'s unique DNA',
    'app.description': 'Personalize the FitScore™ hiring algorithm using your internal data to find candidates who truly match your culture and performance expectations.',
    'app.copyright': '© 2025 FitScore™ | All rights reserved',
    
    // Navigation and actions
    'nav.dashboard': 'Dashboard',
    'nav.getStarted': 'Get Started',
    'nav.startCustomization': 'Start Customization',
    'nav.viewDemoDashboard': 'View Demo Dashboard',
    'nav.recalibrateModel': 'Recalibrate Model',
    'nav.scoreNewCandidate': 'Score New Candidate',
    
    // Dashboard
    'dashboard.title': 'FitScore™ Dashboard',
    'dashboard.subtitle': 'Track and analyze your candidate fit scores',
    'dashboard.candidatesScored': 'Candidates Scored',
    'dashboard.last30days': 'Last 30 days',
    'dashboard.averageFitScore': 'Average FitScore',
    'dashboard.allCandidates': 'All candidates',
    'dashboard.highFitCandidates': 'High Fit Candidates',
    'dashboard.scoreAbove': 'Score > 80',
    'dashboard.candidatesHired': 'Candidates Hired',
    'dashboard.scoreDistribution': 'Score Distribution',
    'dashboard.weeklyTrends': 'Weekly Trends',
    
    // Onboarding
    'onboarding.welcome.title': 'Welcome to FitScore™',
    'onboarding.welcome.description': 'Let\'s customize your FitScore™ algorithm to find candidates who truly fit your company culture.',
    'onboarding.welcome.getStarted': 'Get Started',
    
    'onboarding.companyValues.title': 'Company Values & Culture',
    'onboarding.companyValues.description': 'Select values that best represent your company culture. These will help calibrate the FitScore™ algorithm.',
    'onboarding.companyValues.selectCore': 'Select core company values',
    'onboarding.companyValues.typeValue': 'Type a value and press Enter...',
    'onboarding.companyValues.suggested': 'Suggested values',
    'onboarding.companyValues.description.label': 'Company culture description (optional)',
    'onboarding.companyValues.description.placeholder': 'Briefly describe your company\'s culture, mission, or any unique aspects...',
    
    'onboarding.teamData.title': 'Team Data',
    
    'onboarding.rolesMapping.title': 'Roles Mapping',
    
    'onboarding.hiringDna.title': 'Define Your Hiring DNA',
    'onboarding.hiringDna.description': 'Select the top 5 traits that define your best hires and adjust their importance.',
    'onboarding.hiringDna.traitsSelected': 'of 5 traits selected',
    'onboarding.hiringDna.importance': 'Importance',
    
    'onboarding.calibration.title': 'Calibration Test',
    'onboarding.calibration.description': 'Let\'s calibrate the FitScore™ algorithm by evaluating some sample candidate profiles.',
    'onboarding.calibration.agree': 'Do you agree with this FitScore™ assessment?',
    'onboarding.calibration.agreeButton': 'Agree',
    'onboarding.calibration.disagreeButton': 'Disagree',
    'onboarding.calibration.agreedMessage': 'You agreed with this score',
    'onboarding.calibration.disagreedMessage': 'You disagreed with this score',
    'onboarding.calibration.nextCandidate': 'Next Candidate',
    'onboarding.calibration.candidateProfiles': 'candidate profiles',
    
    'onboarding.finalize.title': 'Finalize & Launch',
    'onboarding.finalize.description': 'Review your FitScore™ customization and get ready to launch your personalized hiring algorithm.',
    'onboarding.finalize.configComplete': 'Configuration Complete!',
    'onboarding.finalize.configDescription': 'Your FitScore™ engine is ready to be activated. This will create a custom AI model based on your inputs.',
    'onboarding.finalize.summary': 'Summary',
    'onboarding.finalize.companyValues': 'Company Values',
    'onboarding.finalize.valuesCount': 'values defined',
    'onboarding.finalize.teamData': 'Historic Team Data',
    'onboarding.finalize.employeesProcessed': 'employees processed',
    'onboarding.finalize.rolesMapped': 'Roles Mapped',
    'onboarding.finalize.rolesConfigured': 'role configured',
    'onboarding.finalize.keyTraits': 'Key Traits Defined',
    'onboarding.finalize.traitsWeighted': 'traits weighted',
    'onboarding.finalize.calibration': 'Algorithm Calibration',
    'onboarding.finalize.profilesEvaluated': 'profiles evaluated',
    'onboarding.finalize.activationNote': 'After activation, your FitScore™ engine will be ready to evaluate new candidates within 15 minutes.',
    'onboarding.finalize.activateButton': 'Activate FitScore™ Engine',
    
    'onboarding.success.title': 'Success!',
    
    // Common terms
    'common.next': 'Next',
    'common.back': 'Back',
    'common.of': 'of',
    
    // Traits
    'trait.growthMindset': 'Growth Mindset',
    'trait.growthMindset.description': 'Embraces challenges, persists through obstacles, and sees effort as a path to mastery.',
    'trait.initiative': 'Initiative',
    'trait.initiative.description': 'Proactively identifies and solves problems without being asked to do so.',
    'trait.ownership': 'Ownership',
    'trait.ownership.description': 'Takes responsibility for their work and outcomes, whether successful or not.',
    'trait.communication': 'Communication',
    'trait.communication.description': 'Clearly and effectively conveys ideas and information to others.',
    'trait.adaptability': 'Adaptability',
    'trait.adaptability.description': 'Adjusts quickly and positively to changing conditions and requirements.',
    'trait.collaboration': 'Collaboration',
    'trait.collaboration.description': 'Works effectively with others toward shared goals and outcomes.',
    'trait.criticalThinking': 'Critical Thinking',
    'trait.criticalThinking.description': 'Analyzes information objectively and makes reasoned judgments.',
    'trait.emotionalIntelligence': 'Emotional Intelligence',
    'trait.emotionalIntelligence.description': 'Recognizes and manages own emotions and understands emotions of others.',
    
    // Company values
    'value.innovation': 'Innovation',
    'value.transparency': 'Transparency',
    'value.customerFocus': 'Customer Focus',
    'value.diversity': 'Diversity',
    'value.excellence': 'Excellence',
    'value.integrity': 'Integrity',
    'value.teamwork': 'Teamwork',
    'value.accountability': 'Accountability',
    'value.growthMindset': 'Growth Mindset',
    'value.ownership': 'Ownership',
    'value.passion': 'Passion',
    'value.quality': 'Quality',
    'value.respect': 'Respect',
    'value.trust': 'Trust',
    'value.adaptability': 'Adaptability',
  }
};
