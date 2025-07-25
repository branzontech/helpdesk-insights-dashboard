import { useState, useMemo } from "react";
import { ParameterCategory, ParameterItem, ParametersStats } from "@/types/parameters";

// Mock data - en producción vendría de API
const mockCategories: ParameterCategory[] = [
  {
    id: "security",
    name: "Seguridad",
    icon: "🔒",
    description: "Configuraciones de seguridad y autenticación"
  },
  {
    id: "notifications",
    name: "Notificaciones",
    icon: "🔔",
    description: "Sistema de notificaciones y alertas"
  },
  {
    id: "analytics",
    name: "Analíticas",
    icon: "📊",
    description: "Herramientas de análisis y reportes"
  },
  {
    id: "integrations",
    name: "Integraciones",
    icon: "🔗",
    description: "Conexiones con sistemas externos"
  },
  {
    id: "workflow",
    name: "Flujos de Trabajo",
    icon: "⚡",
    description: "Automatización y procesos"
  },
  {
    id: "ui",
    name: "Interfaz",
    icon: "🎨",
    description: "Personalización de la interfaz"
  }
];

const mockParameters: ParameterItem[] = [
  {
    id: "2fa",
    name: "Autenticación de Dos Factores",
    description: "Requiere un segundo factor de autenticación para mayor seguridad",
    icon: "🔐",
    category: "security",
    enabled: true,
    impact: "high",
    affectedUsers: 1250,
    dependencies: ["sms_service", "email_service"]
  },
  {
    id: "email_notifications",
    name: "Notificaciones por Email",
    description: "Envío automático de notificaciones importantes por correo",
    icon: "📧",
    category: "notifications",
    enabled: true,
    impact: "medium",
    affectedUsers: 2500
  },
  {
    id: "real_time_analytics",
    name: "Analíticas en Tiempo Real",
    description: "Dashboard con métricas actualizadas en tiempo real",
    icon: "📈",
    category: "analytics",
    enabled: false,
    impact: "low",
    affectedUsers: 150
  },
  {
    id: "slack_integration",
    name: "Integración con Slack",
    description: "Sincronización de notificaciones y alertas con Slack",
    icon: "💬",
    category: "integrations",
    enabled: true,
    impact: "medium",
    affectedUsers: 800,
    dependencies: ["notifications"]
  },
  {
    id: "auto_assignment",
    name: "Asignación Automática",
    description: "Asignación inteligente de tickets basada en carga de trabajo",
    icon: "🤖",
    category: "workflow",
    enabled: false,
    impact: "high",
    affectedUsers: 50,
    dependencies: ["ai_engine", "user_metrics"]
  },
  {
    id: "dark_mode",
    name: "Modo Oscuro",
    description: "Tema oscuro para reducir la fatiga visual",
    icon: "🌙",
    category: "ui",
    enabled: true,
    impact: "low",
    affectedUsers: 1800
  },
  {
    id: "advanced_search",
    name: "Búsqueda Avanzada",
    description: "Motor de búsqueda con filtros y operadores complejos",
    icon: "🔍",
    category: "ui",
    enabled: true,
    impact: "medium",
    affectedUsers: 900
  },
  {
    id: "audit_logs",
    name: "Logs de Auditoría",
    description: "Registro detallado de todas las acciones del sistema",
    icon: "📋",
    category: "security",
    enabled: false,
    impact: "high",
    affectedUsers: 25,
    dependencies: ["database_logging"]
  }
];

interface UseParametersDataProps {
  searchTerm: string;
  selectedCategory: string;
  selectedStatus: string;
}

export const useParametersData = ({
  searchTerm,
  selectedCategory,
  selectedStatus
}: UseParametersDataProps) => {
  const [parameters] = useState<ParameterItem[]>(mockParameters);

  const filteredParameters = useMemo(() => {
    return parameters.filter((param) => {
      const matchesSearch = param.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          param.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || param.category === selectedCategory;
      
      const matchesStatus = selectedStatus === "all" || 
                           (selectedStatus === "enabled" && param.enabled) ||
                           (selectedStatus === "disabled" && !param.enabled);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [parameters, searchTerm, selectedCategory, selectedStatus]);

  const stats: ParametersStats = useMemo(() => {
    const total = parameters.length;
    const enabled = parameters.filter(p => p.enabled).length;
    const disabled = total - enabled;

    return { total, enabled, disabled };
  }, [parameters]);

  return {
    categories: mockCategories,
    parameters,
    filteredParameters,
    stats
  };
};