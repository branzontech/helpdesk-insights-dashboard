
import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { responseTimeData } from '@/lib/mockData';

interface ResponseTimeChartProps {
  className?: string;
}

const ResponseTimeChart: React.FC<ResponseTimeChartProps> = ({ className }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-medium">Tiempo Promedio de Respuesta</h3>
        <p className="text-sm text-muted-foreground">Últimos 7 días (minutos)</p>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={responseTimeData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <YAxis 
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
              labelStyle={{
                fontWeight: 'bold',
                marginBottom: '0.25rem',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              name="Tiempo de respuesta"
              dataKey="tiempo"
              stroke="#118AB2"
              strokeWidth={2}
              activeDot={{ r: 6, fill: '#118AB2' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          <span className="font-medium">Promedio: </span>
          <span className="text-alert-success">18.9 min</span>
        </div>
        <div>
          <span className="font-medium">Meta SLA: </span>
          <span>30 min</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-alert-success mr-1"></div>
          <span className="text-alert-success">Por debajo del objetivo</span>
        </div>
      </div>
    </div>
  );
};

export default ResponseTimeChart;
