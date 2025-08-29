
import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  ChartBar, 
  ChartLine, 
  Clock, 
  ChartPie,
  Settings
} from 'lucide-react';
import { SettingsPanel } from '@/components/settings/SettingsPanel';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active }) => {
  return (
    <li>
      <a 
        href="#" 
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
      </a>
    </li>
  );
};

const Sidebar: React.FC = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <SettingsPanel 
        isOpen={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
      />
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
            <NavItem icon={ChartBar} label="Dashboard" active />
            <NavItem icon={MessageSquare} label="Tickets" />
            <NavItem icon={Users} label="Agentes" />
          </ul>
          
          <p className="text-xs uppercase text-white/50 font-semibold mb-2 px-4">ANÁLISIS</p>
          <ul className="space-y-1 mb-6">
            <NavItem icon={ChartLine} label="Rendimiento" />
            <NavItem icon={Clock} label="Tiempos" />
            <NavItem icon={ChartPie} label="Categorías" />
          </ul>
          
          <p className="text-xs uppercase text-white/50 font-semibold mb-2 px-4">CONFIGURACIÓN</p>
          <ul className="space-y-1 mb-6">
            <li>
              <button 
                onClick={() => setSettingsOpen(true)}
                className="flex items-center px-4 py-3 rounded-md transition-colors text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground w-full text-left"
              >
                <Settings size={18} className="mr-3" />
                <span className="font-medium">Configuración</span>
              </button>
            </li>
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
    </>
  );
};

export default Sidebar;
