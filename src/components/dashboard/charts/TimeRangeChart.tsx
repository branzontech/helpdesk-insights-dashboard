import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { timeRangeData } from '@/lib/mockData';

const TimeRangeChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Tiempo por Tramo de Horarios</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={timeRangeData} 
          layout="horizontal"
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            type="number"
            tick={{ fontSize: 12 }} 
            stroke="#9ca3af"
          />
          <YAxis 
            type="category"
            dataKey="range" 
            tick={{ fontSize: 12 }} 
            stroke="#9ca3af"
            width={80}
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
              if (name === 'percentage') return [value + '%', 'Porcentaje'];
              return [value, name];
            }}
          />
          <Bar 
            dataKey="cases" 
            fill="#83C5BE" 
            radius={[0, 4, 4, 0]}
            name="cases"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeRangeChart;