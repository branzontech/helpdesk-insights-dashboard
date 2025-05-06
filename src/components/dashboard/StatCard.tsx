
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  footer?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, change, footer }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
      <div className="flex justify-between mb-4">
        <div 
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center", 
            `bg-${color}/10`
          )}
        >
          <div className={cn(`text-${color}`)}>{icon}</div>
        </div>
        
        {change && (
          <div className={cn(
            "flex items-center text-xs font-medium",
            change.type === 'increase' ? 'text-alert-success' : 'text-alert-error'
          )}>
            {change.type === 'increase' ? (
              <ArrowUp size={14} className="mr-1" />
            ) : (
              <ArrowDown size={14} className="mr-1" />
            )}
            {Math.abs(change.value)}%
          </div>
        )}
      </div>
      
      <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
      <div className="text-2xl font-semibold">{value}</div>
      
      {footer && (
        <div className="text-xs text-muted-foreground mt-2">{footer}</div>
      )}
    </div>
  );
};

export default StatCard;
