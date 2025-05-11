
import React, { useState } from 'react';
import { StepLayout } from './step-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { X, Plus, ChevronRight } from 'lucide-react';

interface RolesMappingProps {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

interface Role {
  id: string;
  title: string;
  skills: string[];
  traits: string[];
}

export const RolesMapping: React.FC<RolesMappingProps> = ({ onNext, onBack, currentStep, totalSteps }) => {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      title: 'Software Engineer',
      skills: ['Programming', 'Problem Solving', 'Testing'],
      traits: ['Analytical Thinking', 'Attention to Detail']
    }
  ]);
  const [activeRoleId, setActiveRoleId] = useState<string>('1');
  const [newRoleTitle, setNewRoleTitle] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newTrait, setNewTrait] = useState('');

  const activeRole = roles.find(role => role.id === activeRoleId) || roles[0];

  const addRole = () => {
    if (newRoleTitle.trim()) {
      const newRole: Role = {
        id: Date.now().toString(),
        title: newRoleTitle,
        skills: [],
        traits: []
      };
      setRoles([...roles, newRole]);
      setActiveRoleId(newRole.id);
      setNewRoleTitle('');
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !activeRole.skills.includes(newSkill)) {
      const updatedRoles = roles.map(role => 
        role.id === activeRoleId 
          ? { ...role, skills: [...role.skills, newSkill] }
          : role
      );
      setRoles(updatedRoles);
      setNewSkill('');
    }
  };

  const addTrait = () => {
    if (newTrait.trim() && !activeRole.traits.includes(newTrait)) {
      const updatedRoles = roles.map(role => 
        role.id === activeRoleId 
          ? { ...role, traits: [...role.traits, newTrait] }
          : role
      );
      setRoles(updatedRoles);
      setNewTrait('');
    }
  };

  const removeSkill = (skill: string) => {
    const updatedRoles = roles.map(role => 
      role.id === activeRoleId 
        ? { ...role, skills: role.skills.filter(s => s !== skill) }
        : role
    );
    setRoles(updatedRoles);
  };

  const removeTrait = (trait: string) => {
    const updatedRoles = roles.map(role => 
      role.id === activeRoleId 
        ? { ...role, traits: role.traits.filter(t => t !== trait) }
        : role
    );
    setRoles(updatedRoles);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent, type: 'skill' | 'trait') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'skill') {
        addSkill();
      } else {
        addTrait();
      }
    }
  };

  return (
    <StepLayout
      title="Roles & Squad Mapping"
      description="Define key roles in your company and their required skills and traits."
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      onNext={onNext}
    >
      <div className="space-y-6">
        <div className="flex gap-4 flex-wrap">
          {roles.map(role => (
            <Button
              key={role.id}
              variant={role.id === activeRoleId ? "default" : "outline"}
              onClick={() => setActiveRoleId(role.id)}
              className="rounded-full"
            >
              {role.title}
            </Button>
          ))}
          
          <div className="flex items-center">
            <Input
              value={newRoleTitle}
              onChange={(e) => setNewRoleTitle(e.target.value)}
              placeholder="Add new role..."
              className="w-40 rounded-l-full"
            />
            <Button
              variant="outline"
              onClick={addRole}
              disabled={!newRoleTitle.trim()}
              className="rounded-r-full border-l-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <Card className="p-6 bg-fitscore-gray-50 border">
          <h3 className="text-lg font-medium mb-4">Define: {activeRole.title}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Required Skills</label>
              <div className="tag-input-container bg-white">
                {activeRole.skills.map(skill => (
                  <div key={skill} className="tag-item">
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 text-fitscore-blue hover:text-fitscore-blue-dark"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <div className="flex-grow flex">
                  <Input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, 'skill')}
                    placeholder="Add skill..."
                    className="border-none focus:ring-0 p-0 min-w-[150px] text-sm"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={addSkill}
                    disabled={!newSkill.trim()}
                    className="h-auto py-0 px-2"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Behavioral Traits</label>
              <div className="tag-input-container bg-white">
                {activeRole.traits.map(trait => (
                  <div key={trait} className="tag-item">
                    <span>{trait}</span>
                    <button
                      type="button"
                      onClick={() => removeTrait(trait)}
                      className="ml-1 text-fitscore-blue hover:text-fitscore-blue-dark"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <div className="flex-grow flex">
                  <Input
                    type="text"
                    value={newTrait}
                    onChange={(e) => setNewTrait(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, 'trait')}
                    placeholder="Add behavioral trait..."
                    className="border-none focus:ring-0 p-0 min-w-[150px] text-sm"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={addTrait}
                    disabled={!newTrait.trim()}
                    className="h-auto py-0 px-2"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </StepLayout>
  );
};
