
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
import { agentPerformanceData } from '@/lib/mockData';

interface AgentPerformanceChartProps {
  className?: string;
}

const AgentPerformanceChart: React.FC<AgentPerformanceChartProps> = ({ className }) => {
  const chartData = agentPerformanceData.map(agent => ({
    name: agent.name.split(' ')[0], // Solo el primer nombre para la visualización
    casesHandled: agent.casesHandled,
    avgResponseTime: agent.avgResponseTime,
    avgResolutionTime: agent.avgResolutionTime / 10, // Dividido por 10 para escalar mejor en el gráfico
    satisfaction: agent.satisfaction * 10, // Multiplicado por 10 para mejor visibilidad
  }));
  
  const getAgentWithBestPerformance = () => {
    return agentPerformanceData.reduce((best, current) => {
      // Simple métrica: más casos + mejor satisfacción - tiempo de respuesta
      const bestScore = best.casesHandled * best.satisfaction / best.avgResponseTime;
      const currentScore = current.casesHandled * current.satisfaction / current.avgResponseTime;
      
      return currentScore > bestScore ? current : best;
    }, agentPerformanceData[0]);
  };
  
  const bestAgent = getAgentWithBestPerformance();
  
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-medium">Rendimiento por Agente</h3>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <div className="text-xs px-2 py-1 bg-alert-success/10 text-alert-success rounded-full">
            Agente destacado: {bestAgent.name}
          </div>
          <div className="text-xs px-2 py-1 bg-tag-purple/10 text-tag-purple rounded-full">
            {bestAgent.casesHandled} casos atendidos
          </div>
          <div className="text-xs px-2 py-1 bg-tag-blue/10 text-tag-blue rounded-full">
            {bestAgent.satisfaction}/5 satisfacción
          </div>
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value, name) => {
                if (name === 'avgResponseTime') return [value + ' min', 'Tiempo respuesta'];
                if (name === 'casesHandled') return [value, 'Casos atendidos'];
                if (name === 'avgResolutionTime') return [(value as number) * 10 + ' min', 'Tiempo resolución'];
                if (name === 'satisfaction') return [((value as number) / 10).toFixed(1) + '/5', 'Satisfacción'];
                return [value, name];
              }}
            />
            <Legend 
              formatter={(value) => {
                if (value === 'casesHandled') return 'Casos';
                if (value === 'avgResponseTime') return 'T. Respuesta (min)';
                if (value === 'avgResolutionTime') return 'T. Resolución (min/10)';
                if (value === 'satisfaction') return 'Satisfacción (x10)';
                return value;
              }}
            />
            <Bar name="casesHandled" dataKey="casesHandled" fill="#118AB2" radius={[4, 4, 0, 0]} />
            <Bar name="avgResponseTime" dataKey="avgResponseTime" fill="#FFB347" radius={[4, 4, 0, 0]} />
            <Bar name="avgResolutionTime" dataKey="avgResolutionTime" fill="#FF6B6B" radius={[4, 4, 0, 0]} />
            <Bar name="satisfaction" dataKey="satisfaction" fill="#4AD295" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6">
        <h4 className="font-medium text-sm mb-3">Detalle de Agentes</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-muted/30">
                <th className="px-3 py-2 text-left font-medium">Agente</th>
                <th className="px-3 py-2 text-center font-medium">Casos</th>
                <th className="px-3 py-2 text-center font-medium">T. Respuesta</th>
                <th className="px-3 py-2 text-center font-medium">T. Resolución</th>
                <th className="px-3 py-2 text-center font-medium">Satisfacción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {agentPerformanceData.map((agent, index) => (
                <tr key={index} className={index === 0 ? "bg-alert-success/5" : ""}>
                  <td className="px-3 py-2 font-medium">{agent.name}</td>
                  <td className="px-3 py-2 text-center">{agent.casesHandled}</td>
                  <td className="px-3 py-2 text-center">{agent.avgResponseTime} min</td>
                  <td className="px-3 py-2 text-center">{agent.avgResolutionTime} min</td>
                  <td className="px-3 py-2 text-center">
                    <div className="flex items-center justify-center">
                      <div className={`w-8 text-white text-xs font-medium rounded-sm px-1 text-center ${agent.satisfaction >= 4.5 ? 'bg-alert-success' : agent.satisfaction >= 4 ? 'bg-alert-warning' : 'bg-alert-error'}`}>
                        {agent.satisfaction}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentPerformanceChart;
