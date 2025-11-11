
import React from 'react';
import { Calendar, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/hooks/useNotifications';
import { toast } from 'sonner';

const Header: React.FC = () => {
  const { showNotification, checkPermission } = useNotifications();
  
  // Obtener la fecha actual en español
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const testNotification = async () => {
    const permission = checkPermission();
    
    if (permission === 'denied') {
      toast.error('Las notificaciones están bloqueadas. Permite las notificaciones en tu navegador.');
      return;
    }

    await showNotification({
      title: '🎫 Nuevo Ticket Creado',
      body: 'TICK-TEST-001: Problema con impresora - Juan Pérez',
      tag: 'test-notification',
    });
    
    toast.success('Notificación de prueba enviada');
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 px-6 bg-white rounded-lg shadow-sm mb-6">
      <div>
        <h1 className="text-ithelp-teal-dark font-bold">Dashboard Mesa de Ayuda TIC</h1>
        <div className="flex items-center text-muted-foreground text-sm mt-1">
          <Calendar size={16} className="mr-1" />
          <span>{getCurrentDate()}</span>
        </div>
      </div>
      <div className="flex items-center mt-4 md:mt-0 gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={testNotification}
          className="flex items-center gap-2"
        >
          <Bell className="h-4 w-4" />
          Probar Notificación
        </Button>
        <div className="bg-ithelp-lime text-ithelp-teal-dark px-3 py-1 rounded-full text-sm font-medium">
          ITIL v4
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-ithelp-teal-medium flex items-center justify-center text-white mr-2">
            <User size={16} />
          </div>
          <div className="text-sm">
            <p className="font-medium">Admin</p>
            <p className="text-muted-foreground text-xs">Administrador</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
