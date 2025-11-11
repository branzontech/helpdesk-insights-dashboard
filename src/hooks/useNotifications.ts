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
    if (!('Notification' in window)) {
      console.warn('Este navegador no soporta notificaciones');
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission;
    }

    return Notification.permission;
  };

  const showNotification = async (options: NotificationOptions) => {
    const permission = await requestPermission();

    if (permission !== 'granted') {
      console.warn('Permiso de notificaciones denegado');
      return;
    }

    // Play sound
    if (!options.silent && audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      } catch (error) {
        console.error('Error reproduciendo sonido:', error);
      }
    }

    // Show notification
    const notification = new Notification(options.title, {
      body: options.body,
      icon: options.icon || '/robot-mascot.png',
      tag: options.tag,
      requireInteraction: false,
      badge: '/robot-mascot.png',
    });

    // Auto close after 5 seconds
    setTimeout(() => notification.close(), 5000);

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    return notification;
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
