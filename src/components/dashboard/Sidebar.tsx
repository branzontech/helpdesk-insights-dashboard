
import React from 'react';
import { 
  Users, 
  MessageSquare, 
  ChartBar, 
  ChartLine, 
  Clock, 
  ChartPie,
  Settings
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, to }) => {
  const location = useLocation();
  const active = location.pathname === to;
  
  return (
    <li>
      <Link 
        to={to}
        className={cn(
          "flex items-center px-4 py-3 rounded-md transition-colors",
          active 
            ? "bg-sidebar-accent text-sidebar-accent-foreground" 
            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        )}
      >
        <Icon size={18} className="mr-3" />
        <span className="font-medium">{label}</span>
        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-ithelp-lime"></div>}
      </Link>
    </li>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-ithelp-teal-dark text-white h-screen flex-shrink-0 fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 rounded bg-ithelp-lime flex items-center justify-center text-ithelp-teal-dark font-bold">
            IT
          </div>
          <h2 className="ml-3 font-bold text-xl">IT Help Dashboard</h2>
        </div>
        
        <nav>
          <p className="text-xs uppercase text-white/50 font-semibold mb-2 px-4">GENERAL</p>
          <ul className="space-y-1 mb-6">
            <NavItem icon={ChartBar} label="Dashboard" to="/" />
            <li data-tour="sidebar-tickets">
              <NavItem icon={MessageSquare} label="Tickets" to="/tickets" />
            </li>
            <NavItem icon={Users} label="Agentes" to="/agents" />
          </ul>
          
          <p className="text-xs uppercase text-white/50 font-semibold mb-2 px-4">ANÁLISIS</p>
          <ul className="space-y-1 mb-6">
            <NavItem icon={ChartLine} label="Rendimiento" to="/performance" />
            <NavItem icon={Clock} label="Tiempos" to="/times" />
            <NavItem icon={ChartPie} label="Categorías" to="/categories" />
          </ul>
          
          <p className="text-xs uppercase text-white/50 font-semibold mb-2 px-4">CONFIGURACIÓN</p>
          <ul className="space-y-1 mb-6">
            <li data-tour="sidebar-knowledge">
              <NavItem icon={MessageSquare} label="Base de Conocimientos" to="/knowledge" />
            </li>
            <li data-tour="sidebar-parameters">
              <NavItem icon={Settings} label="Parámetros" to="/parameters" />
            </li>
            <NavItem icon={Settings} label="Configuración" to="/settings" />
          </ul>
        </nav>
        
        <div className="mt-auto pt-6">
          <div className="bg-sidebar-accent rounded-lg p-4">
            <h4 className="font-medium text-sm mb-1 text-white">Mejora Continua</h4>
            <p className="text-xs text-white/70 mb-3">
              Basado en ITIL v4 para optimizar la gestión de servicios
            </p>
            <a href="#" className="text-xs font-medium text-ithelp-lime inline-block">
              Ver guía →
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
