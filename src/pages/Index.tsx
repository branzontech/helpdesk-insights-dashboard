
import React from 'react';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import StatCard from '@/components/dashboard/StatCard';
import ResponseTimeChart from '@/components/dashboard/charts/ResponseTimeChart';
import CasesStatusChart from '@/components/dashboard/charts/CasesStatusChart';
import CasesCategoryChart from '@/components/dashboard/charts/CasesCategoryChart';
import AgentPerformanceChart from '@/components/dashboard/charts/AgentPerformanceChart';
import SatisfactionChart from '@/components/dashboard/charts/SatisfactionChart';
import WeeklyActivityChart from '@/components/dashboard/charts/WeeklyActivityChart';
import TimeRangeChart from '@/components/dashboard/charts/TimeRangeChart';

import { Clock, MessageSquare, Users, ChartBar, Timer, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  casesStatusData, 
  agentPerformanceData, 
  satisfactionData, 
  firstResponseTimeData 
} from '@/lib/mockData';

const Index = () => {
  const avgResponseTime = agentPerformanceData.reduce((sum, agent) => sum + agent.avgResponseTime, 0) / agentPerformanceData.length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="pl-64">
        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <Header />
            <Link to="/ticket/TICK-2024-001">
              <Button className="flex items-center space-x-2">
                <Ticket className="h-4 w-4" />
                <span>View Sample Ticket</span>
              </Button>
            </Link>
          </div>
          
          {/* Tarjetas de estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            <StatCard 
              title="Tiempo Promedio de Respuesta" 
              value={`${avgResponseTime.toFixed(1)} min`} 
              icon={<Clock size={20} />} 
              color="alert-info"
              change={{ value: 12, type: 'decrease' }} 
              footer="Último mes"
            />
            
            <StatCard 
              title="Tiempo Primera Respuesta" 
              value={`${firstResponseTimeData.avgMinutes} min`} 
              icon={<Timer size={20} />} 
              color="tag-purple"
              change={{ value: Math.abs(firstResponseTimeData.change), type: 'decrease' }} 
              footer="Último mes"
            />
            
            <StatCard 
              title="Casos Creados" 
              value={casesStatusData.created} 
              icon={<MessageSquare size={20} />} 
              color="tag-blue"
              change={{ value: 8, type: 'increase' }} 
              footer="Último mes"
            />
            
            <StatCard 
              title="Casos Cerrados" 
              value={casesStatusData.closed} 
              icon={<ChartBar size={20} />} 
              color="alert-success"
              change={{ value: 15, type: 'increase' }} 
              footer="Último mes"
            />
            
            <StatCard 
              title="Satisfacción del Cliente" 
              value={`${satisfactionData.current}/5`} 
              icon={<Users size={20} />} 
              color="ithelp-lime"
              change={{ value: 4, type: 'increase' }} 
              footer="Último mes"
            />
          </div>
          
          {/* Gráficos en cuadrícula */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ResponseTimeChart />
            <CasesStatusChart />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <CasesCategoryChart />
            <SatisfactionChart />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <WeeklyActivityChart />
            <TimeRangeChart />
          </div>
          
          <div className="mb-6">
            <AgentPerformanceChart />
          </div>
          
          {/* Pie de página con información de ITIL */}
          <footer className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center text-sm text-muted-foreground">
            <p>Dashboard de Mesa de Ayuda TIC - Implementado según mejores prácticas de ITIL v4</p>
            <p className="text-xs mt-1">Valor, Resultados y Mejora Continua</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
