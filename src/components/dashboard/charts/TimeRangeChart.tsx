import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { timeRangeData } from '@/lib/mockData';

const TimeRangeChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Tiempo por Tramo de Horarios</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart 
          data={timeRangeData} 
          layout="vertical"
          margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            type="number"
            tick={{ fontSize: 12 }} 
            stroke="#9ca3af"
            domain={[0, 'dataMax + 10']}
          />
          <YAxis 
            type="category"
            dataKey="range" 
            tick={{ fontSize: 12 }} 
            stroke="#9ca3af"
            width={90}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value, name) => {
              if (name === 'cases') return [value, 'Casos'];
              return [value, name];
            }}
          />
          <Bar 
            dataKey="cases" 
            fill="#4A8F9F" 
            radius={[0, 4, 4, 0]}
            name="cases"
          >
            <LabelList 
              dataKey="percentage" 
              position="center" 
              fill="white" 
              fontSize={12}
              fontWeight="600"
              formatter={(value) => `${value}%`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeRangeChart;