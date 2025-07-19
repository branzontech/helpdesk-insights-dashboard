import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { weeklyActivityData } from '@/lib/mockData';

const WeeklyActivityChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Días Más Movidos de la Semana</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={weeklyActivityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 12 }} 
            stroke="#9ca3af"
          />
          <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value) => [value, 'Casos']}
          />
          <Bar 
            dataKey="cases" 
            fill="#006D77" 
            radius={[4, 4, 0, 0]}
            name="Casos"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyActivityChart;