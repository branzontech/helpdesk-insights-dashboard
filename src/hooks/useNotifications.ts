import { useEffect, useRef } from 'react';

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  tag?: string;
  silent?: boolean;
}

export const useNotifications = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio('/notification-sound.mp3');
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const requestPermission = async (): Promise<NotificationPermission> => {
    console.log('🔔 Solicitando permiso de notificaciones...');
    
    if (!('Notification' in window)) {
      console.warn('❌ Este navegador no soporta notificaciones');
      return 'denied';
    }

    console.log('📊 Estado actual de permisos:', Notification.permission);

    if (Notification.permission === 'granted') {
      console.log('✅ Permisos ya concedidos');
      return 'granted';
    }

    if (Notification.permission !== 'denied') {
      console.log('⏳ Solicitando permiso al usuario...');
      
      // Detectar si estamos en iframe
      const inIframe = window.top !== window.self;
      if (inIframe) {
        console.warn('⚠️ Estamos en un iframe, los permisos pueden no funcionar');
      }
      
      try {
        const permission = await Promise.race([
          Notification.requestPermission(),
          new Promise<NotificationPermission>((resolve) => 
            setTimeout(() => {
              console.warn('⏱️ Timeout: El usuario no respondió en 10 segundos');
              resolve('default');
            }, 10000)
          )
        ]);
        
        console.log('📋 Respuesta del usuario:', permission);
        return permission;
      } catch (error) {
        console.error('❌ Error al solicitar permisos:', error);
        return 'denied';
      }
    }

    console.log('🚫 Permisos denegados previamente');
    return Notification.permission;
  };

  const showNotification = async (options: NotificationOptions) => {
    console.log('🚀 Intentando mostrar notificación:', options);
    
    const permission = await requestPermission();

    if (permission !== 'granted') {
      console.warn('⚠️ Permiso de notificaciones denegado. Estado:', permission);
      return;
    }

    console.log('✅ Permiso concedido, creando notificación...');

    // Play sound
    if (!options.silent && audioRef.current) {
      try {
        console.log('🔊 Reproduciendo sonido de notificación...');
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
        console.log('✅ Sonido reproducido correctamente');
      } catch (error) {
        console.error('❌ Error reproduciendo sonido:', error);
      }
    }

    try {
      // Show notification
      console.log('📢 Creando notificación del sistema...');
      const notification = new Notification(options.title, {
        body: options.body,
        icon: options.icon || '/robot-mascot.png',
        tag: options.tag,
        requireInteraction: false,
        badge: '/robot-mascot.png',
      });

      console.log('✅ Notificación creada exitosamente:', notification);

      // Auto close after 5 seconds
      setTimeout(() => {
        console.log('⏰ Cerrando notificación automáticamente');
        notification.close();
      }, 5000);

      notification.onclick = () => {
        console.log('👆 Usuario hizo clic en la notificación');
        window.focus();
        notification.close();
      };

      notification.onerror = (error) => {
        console.error('❌ Error en la notificación:', error);
      };

      notification.onshow = () => {
        console.log('👁️ Notificación mostrada al usuario');
      };

      notification.onclose = () => {
        console.log('🔒 Notificación cerrada');
      };

      return notification;
    } catch (error) {
      console.error('❌ Error crítico al crear notificación:', error);
      throw error;
    }
  };

  const checkPermission = (): NotificationPermission => {
    if (!('Notification' in window)) {
      return 'denied';
    }
    return Notification.permission;
  };

  return {
    showNotification,
    requestPermission,
    checkPermission,
    isSupported: 'Notification' in window,
  };
};
