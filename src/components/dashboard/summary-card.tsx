
import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva("", {
  variants: {
    variant: {
      default: "bg-white",
      blue: "bg-gradient-to-r from-fitscore-blue-light to-fitscore-blue/10",
      green: "bg-gradient-to-r from-green-50 to-green-100",
      purple: "bg-gradient-to-r from-fitscore-purple/10 to-fitscore-purple/20",
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

interface SummaryCardProps extends VariantProps<typeof cardVariants> {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  value, 
  subtitle,
  icon,
  variant,
  className
}) => {
  return (
    <Card className={`${cardVariants({ variant })} ${className || ""} border-0 shadow-sm`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-fitscore-gray-500 mb-1">{title}</p>
            <CardTitle className="text-2xl font-bold">{value}</CardTitle>
            {subtitle && <p className="text-sm text-fitscore-gray-500 mt-1">{subtitle}</p>}
          </div>
          {icon && (
            <div className="p-2 rounded-full bg-white/80">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
