
import React, { useState } from 'react';
import { StepLayout } from './step-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TeamDataProps {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const TeamData: React.FC<TeamDataProps> = ({ onNext, onBack, currentStep, totalSteps }) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      
      // Mock preview data - in a real app, parse the CSV
      setPreviewData([
        { name: 'John Smith', position: 'Sr. Developer', performance: 'High', tenure: '3.5 years' },
        { name: 'Maria Garcia', position: 'Product Manager', performance: 'Medium', tenure: '2.1 years' },
        { name: 'Alex Chen', position: 'UX Designer', performance: 'High', tenure: '1.8 years' }
      ]);
    }
  };

  const resetFile = () => {
    setFile(null);
    setPreviewData([]);
  };

  return (
    <StepLayout
      title="Historic Team Data Input"
      description="Upload data about your current and past team members to help FitScore™ understand your company's performance patterns."
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      onNext={onNext}
    >
      <div className="space-y-6">
        <div className="bg-fitscore-blue-light p-4 rounded-lg flex items-start gap-3">
          <div className="text-fitscore-blue bg-white p-1.5 rounded-full">
            <Info className="w-4 h-4" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-fitscore-blue">Security Note</p>
            <p className="text-fitscore-gray-600">
              Your data is encrypted and used only to train your company's model. No individual employee 
              data is stored or shared.
            </p>
          </div>
        </div>

        {!file ? (
          <div className="border-2 border-dashed border-fitscore-gray-200 rounded-lg p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-fitscore-blue-light rounded-full flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-fitscore-blue">
                <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L2.621 19.485C2.72915 19.9177 2.97882 20.3018 3.33033 20.5763C3.68184 20.8508 4.11501 20.9999 4.561 21H19.439C19.885 20.9999 20.3182 20.8508 20.6697 20.5763C21.0212 20.3018 21.2708 19.9177 21.379 19.485L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-medium text-lg mb-2">Upload Employee Data</h3>
            <p className="text-fitscore-gray-500 mb-4">
              Upload a CSV file with employee details: Name, Position, Performance rating, and Tenure.
            </p>
            <div className="flex justify-center">
              <Input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button type="button" variant="outline" asChild>
                  <span>Choose CSV File</span>
                </Button>
              </label>
            </div>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-fitscore-gray-50 p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-fitscore-gray-500">{previewData.length} records</p>
              </div>
              <Button variant="ghost" size="sm" onClick={resetFile}>Change file</Button>
            </div>
            
            <div className="p-4 max-h-[300px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Tenure</TableHead>
                    <TableHead>High Performer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewData.map((employee, i) => (
                    <TableRow key={i}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.performance}</TableCell>
                      <TableCell>{employee.tenure}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            defaultChecked={employee.performance === 'High'}
                            className="mr-2 h-4 w-4 rounded border-gray-300 text-fitscore-blue focus:ring-fitscore-blue"
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span><Info className="h-4 w-4 text-fitscore-gray-400" /></span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Mark if this employee is considered a high performer</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        <div>
          <p className="text-sm text-fitscore-gray-500">
            Don't have a CSV ready? <Button variant="link" className="p-0 h-auto text-sm">Download our template</Button>
          </p>
        </div>
      </div>
    </StepLayout>
  );
};
