import { useEffect, useState } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useNotifications } from '@/hooks/useNotifications';
import { toast } from 'sonner';

export const NotificationPermission = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const { requestPermission, checkPermission, isSupported } = useNotifications();
  const inIframe = window.top !== window.self;

  useEffect(() => {
    // No mostrar el prompt normal si estamos en iframe
    if (inIframe) {
      console.log('🖼️ Detectado iframe, no se mostrará el prompt estándar');
      return;
    }
    
    if (isSupported && checkPermission() === 'default') {
      // Show prompt after 2 seconds
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSupported, checkPermission, inIframe]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('requestNotifications') === '1') {
      (async () => {
        const perm = await requestPermission();
        if (perm === 'granted') {
          setShowPrompt(false);
          toast.success('Notificaciones activadas');
        } else {
          toast.error('No se pudieron activar las notificaciones');
        }
      })();
    }
  }, [requestPermission]);
  const handleEnable = async () => {
    console.log('👆 Click en botón Activar');
    const perm = await requestPermission();
    console.log('🎯 Resultado final:', perm);
    
    if (perm === 'granted') {
      setShowPrompt(false);
      toast.success('¡Notificaciones activadas correctamente!');
    } else if (perm === 'default') {
      toast.error('No se pudo solicitar el permiso. Abre la app en una nueva pestaña.');
    } else {
      toast.error('Permiso denegado. Revisa la configuración de tu navegador.');
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt || !isSupported) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md animate-in slide-in-from-bottom-5">
      <Alert className="bg-background border-primary/20 shadow-lg">
        <Bell className="h-4 w-4 text-primary" />
        <AlertTitle className="flex items-center justify-between">
          Activar Notificaciones
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 -mr-2"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
        </AlertTitle>
        <AlertDescription className="mt-2 space-y-3">
          <p className="text-sm text-muted-foreground">
            Recibe notificaciones instantáneas cuando se creen nuevos tickets en el sistema.
          </p>
          <div className="flex gap-2">
            <Button
              onClick={handleEnable}
              size="sm"
              className="flex-1"
            >
              Activar
            </Button>
            <Button
              onClick={handleDismiss}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              Más tarde
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};
