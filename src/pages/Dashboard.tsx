
import React from 'react';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { SummaryCard } from '@/components/dashboard/summary-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, Users, Check, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

const scoreDistributionData = [
  { score: '40-50', count: 5 },
  { score: '51-60', count: 8 },
  { score: '61-70', count: 15 },
  { score: '71-80', count: 22 },
  { score: '81-90', count: 12 },
  { score: '91-100', count: 6 },
];

const weeklyTrendData = [
  { week: 'Week 1', avgScore: 72, hired: 2 },
  { week: 'Week 2', avgScore: 74, hired: 1 },
  { week: 'Week 3', avgScore: 78, hired: 3 },
  { week: 'Week 4', avgScore: 80, hired: 4 },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-fitscore-gray-50">
      <DashboardHeader />
      
      <main className="flex-grow container max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">{t('dashboard.title')}</h1>
            <p className="text-fitscore-gray-500">{t('dashboard.subtitle')}</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/onboarding')}>
              {t('nav.recalibrateModel')}
            </Button>
            <Button>
              {t('nav.scoreNewCandidate')}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <SummaryCard 
            title={t('dashboard.candidatesScored')} 
            value={68} 
            subtitle={t('dashboard.last30days')}
            icon={<User className="h-5 w-5 text-fitscore-blue" />}
            variant="blue"
          />
          <SummaryCard 
            title={t('dashboard.averageFitScore')} 
            value="76.4"
            subtitle={t('dashboard.allCandidates')}
            icon={<Clock className="h-5 w-5 text-fitscore-green" />}
            variant="green"
          />
          <SummaryCard 
            title={t('dashboard.highFitCandidates')} 
            value={18} 
            subtitle={t('dashboard.scoreAbove')}
            icon={<Check className="h-5 w-5 text-fitscore-purple" />}
            variant="purple"
          />
          <SummaryCard 
            title={t('dashboard.candidatesHired')} 
            value={10}
            subtitle={t('dashboard.last30days')}
            icon={<Users className="h-5 w-5" />}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg font-medium">{t('dashboard.scoreDistribution')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={scoreDistributionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="score" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3A86FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg font-medium">{t('dashboard.weeklyTrends')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis yAxisId="left" domain={[50, 100]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 10]} />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="avgScore" stroke="#3A86FF" activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" dataKey="hired" stroke="#34D399" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
