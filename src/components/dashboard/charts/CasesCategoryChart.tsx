
import React from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend 
} from 'recharts';
import { casesByCategoryData } from '@/lib/mockData';

interface CasesCategoryChartProps {
  className?: string;
}

const CasesCategoryChart: React.FC<CasesCategoryChartProps> = ({ className }) => {
  const totalCases = casesByCategoryData.reduce((acc, item) => acc + item.value, 0);
  
  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent 
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return percent > 0.05 ? (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };
  
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-medium">Casos por Categoría</h3>
        <p className="text-sm text-muted-foreground">Total: {totalCases} casos</p>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={casesByCategoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {casesByCategoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value} casos`, '']}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              formatter={(value) => {
                const category = casesByCategoryData.find(item => item.name === value);
                return (
                  <span className="text-sm">
                    {value} ({category?.value || 0})
                  </span>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        {casesByCategoryData.slice(0, 2).map((category, index) => (
          <div key={index} className="flex items-center p-2 rounded-md bg-muted/30">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: category.color }}
            />
            <div className="flex-1">
              <div className="text-xs font-medium">{category.name}</div>
              <div className="text-xs text-muted-foreground">
                {((category.value / totalCases) * 100).toFixed(1)}% ({category.value})
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CasesCategoryChart;
