
import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ReferenceLine
} from 'recharts';
import { satisfactionData } from '@/lib/mockData';
import { ArrowUp } from 'lucide-react';

interface SatisfactionChartProps {
  className?: string;
}

const SatisfactionChart: React.FC<SatisfactionChartProps> = ({ className }) => {
  const { current, previous, history } = satisfactionData;
  const change = ((current - previous) / previous * 100).toFixed(1);
  const isPositive = current >= previous;
  
  const getColorByRating = (rating: number) => {
    if (rating >= 4.5) return 'alert-success';
    if (rating >= 4.0) return 'alert-warning';
    return 'alert-error';
  };
  
  const colorClass = `text-${getColorByRating(current)}`;
  
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-medium">Indicador de Satisfacción</h3>
        <p className="text-sm text-muted-foreground">Evaluación de usuarios (1-5)</p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="text-4xl font-bold">{current.toFixed(1)}</div>
          <div className="flex items-center mt-1 text-sm">
            <div className={`flex items-center ${isPositive ? 'text-alert-success' : 'text-alert-error'}`}>
              {isPositive && <ArrowUp size={14} className="mr-1" />}
              {!isPositive && <ArrowUp size={14} className="mr-1 transform rotate-180" />}
              {Math.abs(Number(change))}%
            </div>
            <span className="text-muted-foreground ml-1">vs mes anterior</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="flex flex-col items-center px-3 py-2 rounded-lg bg-muted/20">
            <span className="text-xs text-muted-foreground">Meta</span>
            <span className="text-lg font-medium">4.5</span>
          </div>
          
          <div className={`flex flex-col items-center px-3 py-2 rounded-lg ${
            current >= 4.5 
              ? 'bg-alert-success/10 text-alert-success' 
              : 'bg-alert-warning/10 text-alert-warning'
          }`}>
            <span className="text-xs">Estado</span>
            <span className="text-lg font-medium">
              {current >= 4.5 ? 'Óptimo' : 'En mejora'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={history}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis 
              domain={[3.5, 5]} 
              tick={{ fontSize: 12 }} 
              stroke="#9ca3af" 
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value) => [`${value}/5`, 'Satisfacción']}
            />
            <ReferenceLine y={4.5} stroke="#4AD295" strokeDasharray="3 3" label={{ 
              position: 'right',
              value: 'Meta',
              fill: '#4AD295',
              fontSize: 12
            }} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#118AB2"
              strokeWidth={2}
              dot={{ 
                stroke: '#118AB2', 
                strokeWidth: 2, 
                r: 4,
                fill: 'white'
              }}
              activeDot={{ r: 6, fill: '#118AB2' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-md bg-alert-success/10">
            <div className="text-xs text-muted-foreground">Satisfechos</div>
            <div className="text-sm font-medium text-alert-success">72%</div>
          </div>
          <div className="p-2 rounded-md bg-alert-warning/10">
            <div className="text-xs text-muted-foreground">Neutros</div>
            <div className="text-sm font-medium text-alert-warning">23%</div>
          </div>
          <div className="p-2 rounded-md bg-alert-error/10">
            <div className="text-xs text-muted-foreground">Insatisfechos</div>
            <div className="text-sm font-medium text-alert-error">5%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatisfactionChart;
