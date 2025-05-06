
import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { casesStatusData } from '@/lib/mockData';

interface CasesStatusChartProps {
  className?: string;
}

const CasesStatusChart: React.FC<CasesStatusChartProps> = ({ className }) => {
  const { total, created, inProgress, closed, history } = casesStatusData;
  
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-medium">Estado de Casos</h3>
        <p className="text-sm text-muted-foreground">Total de casos: {total}</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col p-3 rounded-lg bg-muted/30">
          <span className="text-sm text-muted-foreground">Creados</span>
          <span className="text-xl font-medium mt-1">{created}</span>
          <div className="w-full h-1.5 rounded-full bg-tag-blue/30 mt-2">
            <div className="h-full bg-tag-blue rounded-full" style={{ width: `${(created/total*100).toFixed(0)}%` }}></div>
          </div>
        </div>
        
        <div className="flex flex-col p-3 rounded-lg bg-muted/30">
          <span className="text-sm text-muted-foreground">En Proceso</span>
          <span className="text-xl font-medium mt-1">{inProgress}</span>
          <div className="w-full h-1.5 rounded-full bg-alert-warning/30 mt-2">
            <div className="h-full bg-alert-warning rounded-full" style={{ width: `${(inProgress/total*100).toFixed(0)}%` }}></div>
          </div>
        </div>
        
        <div className="flex flex-col p-3 rounded-lg bg-muted/30">
          <span className="text-sm text-muted-foreground">Cerrados</span>
          <span className="text-xl font-medium mt-1">{closed}</span>
          <div className="w-full h-1.5 rounded-full bg-alert-success/30 mt-2">
            <div className="h-full bg-alert-success rounded-full" style={{ width: `${(closed/total*100).toFixed(0)}%` }}></div>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={history}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend />
            <Bar name="Creados" dataKey="created" fill="#7FDBFF" radius={[4, 4, 0, 0]} />
            <Bar name="En Proceso" dataKey="inProgress" fill="#FFB347" radius={[4, 4, 0, 0]} />
            <Bar name="Cerrados" dataKey="closed" fill="#4AD295" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CasesStatusChart;
