import { useState, useMemo } from 'react';
import { 
  Shield, 
  Bell, 
  Palette, 
  Database, 
  Zap, 
  Settings, 
  Users, 
  Mail,
  Globe,
  Lock
} from 'lucide-react';
import type { SettingCategory, Setting, UseSettingsDataProps } from '@/types/settings';

const mockCategories: SettingCategory[] = [
  {
    id: 'security',
    name: 'Seguridad',
    icon: Shield,
    description: 'Configuraciones de seguridad y autenticación',
    order: 1
  },
  {
    id: 'notifications',
    name: 'Notificaciones',
    icon: Bell,
    description: 'Sistema de notificaciones y alertas',
    order: 2
  },
  {
    id: 'appearance',
    name: 'Apariencia',
    icon: Palette,
    description: 'Personalización de la interfaz',
    order: 3
  },
  {
    id: 'data',
    name: 'Datos',
    icon: Database,
    description: 'Gestión y almacenamiento de datos',
    order: 4
  },
  {
    id: 'automation',
    name: 'Automatización',
    icon: Zap,
    description: 'Flujos de trabajo automáticos',
    order: 5
  },
  {
    id: 'system',
    name: 'Sistema',
    icon: Settings,
    description: 'Configuraciones del sistema',
    order: 6
  }
];

const mockSettings: Setting[] = [
  // Security Settings
  {
    id: 'two_factor_auth',
    categoryId: 'security',
    name: 'Autenticación de Dos Factores',
    subtitle: 'Protege tu cuenta con un segundo factor',
    description: 'Requiere un código adicional para iniciar sesión',
    type: 'boolean',
    value: true,
    impact: 'high',
    dependencies: ['sms_service'],
    order: 1
  },
  {
    id: 'session_timeout',
    categoryId: 'security',
    name: 'Tiempo de Sesión',
    subtitle: 'Cierre automático por inactividad',
    type: 'number',
    value: 30,
    min: 5,
    max: 240,
    unit: 'min',
    slider: true,
    impact: 'medium',
    order: 2
  },
  {
    id: 'password_strength',
    categoryId: 'security',
    name: 'Política de Contraseñas',
    type: 'select',
    value: 'medium',
    options: [
      { value: 'low', label: 'Básica' },
      { value: 'medium', label: 'Media' },
      { value: 'high', label: 'Estricta' }
    ],
    impact: 'high',
    order: 3
  },
  {
    id: 'login_attempts',
    categoryId: 'security',
    name: 'Intentos de Inicio de Sesión',
    subtitle: 'Máximo número de intentos fallidos',
    type: 'number',
    value: 5,
    min: 3,
    max: 10,
    unit: 'intentos',
    impact: 'medium',
    order: 4
  },

  // Notification Settings
  {
    id: 'email_notifications',
    categoryId: 'notifications',
    name: 'Notificaciones por Email',
    subtitle: 'Recibe alertas importantes por correo',
    type: 'boolean',
    value: true,
    impact: 'low',
    order: 1
  },
  {
    id: 'desktop_notifications',
    categoryId: 'notifications',
    name: 'Notificaciones de Escritorio',
    subtitle: 'Mostrar notificaciones en el navegador',
    type: 'boolean',
    value: false,
    impact: 'low',
    order: 2
  },
  {
    id: 'notification_frequency',
    categoryId: 'notifications',
    name: 'Frecuencia de Notificaciones',
    type: 'select',
    value: 'immediate',
    options: [
      { value: 'immediate', label: 'Inmediata' },
      { value: 'hourly', label: 'Cada hora' },
      { value: 'daily', label: 'Diaria' }
    ],
    impact: 'low',
    order: 3
  },
  {
    id: 'quiet_hours_start',
    categoryId: 'notifications',
    name: 'Inicio de Horas Silenciosas',
    type: 'number',
    value: 22,
    min: 0,
    max: 23,
    unit: 'h',
    impact: 'low',
    order: 4
  },

  // Appearance Settings
  {
    id: 'dark_mode',
    categoryId: 'appearance',
    name: 'Modo Oscuro',
    subtitle: 'Interfaz con colores oscuros',
    type: 'boolean',
    value: false,
    impact: 'low',
    order: 1
  },
  {
    id: 'theme_color',
    categoryId: 'appearance',
    name: 'Color del Tema',
    type: 'select',
    value: 'blue',
    options: [
      { value: 'blue', label: 'Azul' },
      { value: 'green', label: 'Verde' },
      { value: 'purple', label: 'Morado' },
      { value: 'orange', label: 'Naranja' }
    ],
    impact: 'low',
    order: 2
  },
  {
    id: 'font_size',
    categoryId: 'appearance',
    name: 'Tamaño de Fuente',
    type: 'number',
    value: 14,
    min: 12,
    max: 20,
    unit: 'px',
    slider: true,
    impact: 'low',
    order: 3
  },
  {
    id: 'compact_mode',
    categoryId: 'appearance',
    name: 'Modo Compacto',
    subtitle: 'Reduce el espaciado entre elementos',
    type: 'boolean',
    value: false,
    impact: 'low',
    order: 4
  },

  // Data Settings
  {
    id: 'auto_backup',
    categoryId: 'data',
    name: 'Respaldo Automático',
    subtitle: 'Copia de seguridad programada',
    type: 'boolean',
    value: true,
    impact: 'high',
    order: 1
  },
  {
    id: 'backup_frequency',
    categoryId: 'data',
    name: 'Frecuencia de Respaldo',
    type: 'select',
    value: 'daily',
    options: [
      { value: 'hourly', label: 'Cada hora' },
      { value: 'daily', label: 'Diario' },
      { value: 'weekly', label: 'Semanal' }
    ],
    impact: 'high',
    dependencies: ['auto_backup'],
    order: 2
  },
  {
    id: 'data_retention',
    categoryId: 'data',
    name: 'Retención de Datos',
    subtitle: 'Tiempo de conservación de registros',
    type: 'number',
    value: 90,
    min: 30,
    max: 365,
    unit: 'días',
    slider: true,
    impact: 'medium',
    order: 3
  },
  {
    id: 'export_format',
    categoryId: 'data',
    name: 'Formato de Exportación',
    type: 'select',
    value: 'xlsx',
    options: [
      { value: 'csv', label: 'CSV' },
      { value: 'xlsx', label: 'Excel' },
      { value: 'json', label: 'JSON' },
      { value: 'pdf', label: 'PDF' }
    ],
    impact: 'low',
    order: 4
  },

  // Automation Settings
  {
    id: 'auto_assignment',
    categoryId: 'automation',
    name: 'Asignación Automática',
    subtitle: 'Distribución inteligente de tickets',
    type: 'boolean',
    value: false,
    impact: 'high',
    experimental: true,
    order: 1
  },
  {
    id: 'auto_response',
    categoryId: 'automation',
    name: 'Respuesta Automática',
    subtitle: 'Confirmación automática de recepción',
    type: 'boolean',
    value: true,
    impact: 'medium',
    order: 2
  },
  {
    id: 'escalation_time',
    categoryId: 'automation',
    name: 'Tiempo de Escalamiento',
    subtitle: 'Horas antes de escalar un ticket',
    type: 'number',
    value: 24,
    min: 1,
    max: 168,
    unit: 'h',
    slider: true,
    impact: 'high',
    order: 3
  },
  {
    id: 'workflow_rules',
    categoryId: 'automation',
    name: 'Reglas de Flujo',
    type: 'select',
    value: 'standard',
    options: [
      { value: 'simple', label: 'Básico' },
      { value: 'standard', label: 'Estándar' },
      { value: 'advanced', label: 'Avanzado' }
    ],
    impact: 'high',
    order: 4
  },

  // System Settings
  {
    id: 'maintenance_mode',
    categoryId: 'system',
    name: 'Modo Mantenimiento',
    subtitle: 'Desactiva el acceso temporal al sistema',
    type: 'boolean',
    value: false,
    impact: 'high',
    order: 1
  },
  {
    id: 'max_file_size',
    categoryId: 'system',
    name: 'Tamaño Máximo de Archivo',
    type: 'number',
    value: 10,
    min: 1,
    max: 100,
    unit: 'MB',
    slider: true,
    impact: 'medium',
    order: 2
  },
  {
    id: 'system_language',
    categoryId: 'system',
    name: 'Idioma del Sistema',
    type: 'select',
    value: 'es',
    options: [
      { value: 'es', label: 'Español' },
      { value: 'en', label: 'English' },
      { value: 'pt', label: 'Português' },
      { value: 'fr', label: 'Français' }
    ],
    impact: 'low',
    order: 3
  },
  {
    id: 'log_level',
    categoryId: 'system',
    name: 'Nivel de Registros',
    type: 'select',
    value: 'info',
    options: [
      { value: 'error', label: 'Solo errores' },
      { value: 'warn', label: 'Advertencias' },
      { value: 'info', label: 'Información' },
      { value: 'debug', label: 'Depuración' }
    ],
    impact: 'low',
    order: 4
  }
];

export const useSettingsData = ({ searchTerm, selectedCategory }: UseSettingsDataProps) => {
  const [settings] = useState<Setting[]>(mockSettings);

  const filteredSettings = useMemo(() => {
    return settings
      .filter((setting) => {
        const matchesSearch = 
          setting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          setting.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          setting.description?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategory === 'all' || setting.categoryId === selectedCategory;
        
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        // First sort by category order, then by setting order
        const categoryA = mockCategories.find(c => c.id === a.categoryId);
        const categoryB = mockCategories.find(c => c.id === b.categoryId);
        
        if (categoryA && categoryB && categoryA.order !== categoryB.order) {
          return categoryA.order - categoryB.order;
        }
        
        return a.order - b.order;
      });
  }, [settings, searchTerm, selectedCategory]);

  return {
    categories: mockCategories.sort((a, b) => a.order - b.order),
    settings,
    filteredSettings
  };
};