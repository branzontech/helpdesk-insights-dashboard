import { useState, useMemo } from "react";
import { ParameterCategory, ParameterItem, ParametersStats, ParameterModule } from "@/types/parameters";

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

const mockModules: ParameterModule[] = [
  {
    id: "core",
    name: "Núcleo",
    icon: "⚙️",
    description: "Funcionalidades básicas del sistema",
    color: "bg-blue-500"
  },
  {
    id: "helpdesk",
    name: "Mesa de Ayuda",
    icon: "🎫",
    description: "Gestión de tickets y soporte",
    color: "bg-green-500"
  },
  {
    id: "knowledge",
    name: "Base de Conocimiento",
    icon: "📚",
    description: "Gestión de artículos y documentación",
    color: "bg-purple-500"
  },
  {
    id: "reports",
    name: "Reportes",
    icon: "📊",
    description: "Analíticas y dashboards",
    color: "bg-orange-500"
  },
  {
    id: "admin",
    name: "Administración",
    icon: "👤",
    description: "Configuración y usuarios",
    color: "bg-red-500"
  }
];

const mockParameters: ParameterItem[] = [
  // Core Module
  {
    id: "2fa",
    name: "Autenticación de Dos Factores",
    description: "Requiere segundo factor de autenticación",
    icon: "🔐",
    category: "security",
    module: "core",
    type: "boolean",
    value: true,
    impact: "high",
    affectedUsers: 1250,
    dependencies: ["sms_service", "email_service"]
  },
  {
    id: "session_timeout",
    name: "Tiempo de Sesión",
    description: "Minutos antes de cerrar sesión automáticamente",
    icon: "⏰",
    category: "security",
    module: "core",
    type: "number",
    value: 30,
    min: 5,
    max: 480,
    unit: "minutos",
    impact: "medium",
    affectedUsers: 2500
  },
  {
    id: "max_file_size",
    name: "Tamaño Máximo de Archivo",
    description: "Límite de tamaño para archivos subidos",
    icon: "📁",
    category: "storage",
    module: "core",
    type: "number",
    value: 10,
    min: 1,
    max: 100,
    unit: "MB",
    impact: "low",
    affectedUsers: 2500
  },
  {
    id: "system_language",
    name: "Idioma del Sistema",
    description: "Idioma predeterminado para nuevos usuarios",
    icon: "🌐",
    category: "ui",
    module: "core",
    type: "select",
    value: "es",
    options: ["es", "en", "pt", "fr"],
    impact: "low",
    affectedUsers: 2500
  },

  // Helpdesk Module
  {
    id: "auto_assignment",
    name: "Asignación Automática",
    description: "Asignación inteligente de tickets",
    icon: "🤖",
    category: "workflow",
    module: "helpdesk",
    type: "boolean",
    value: false,
    impact: "high",
    affectedUsers: 50,
    dependencies: ["ai_engine", "user_metrics"]
  },
  {
    id: "ticket_limit",
    name: "Límite de Tickets por Agente",
    description: "Máximo de tickets asignados por agente",
    icon: "📋",
    category: "workflow",
    module: "helpdesk",
    type: "number",
    value: 25,
    min: 5,
    max: 100,
    unit: "tickets",
    impact: "medium",
    affectedUsers: 50
  },
  {
    id: "escalation_time",
    name: "Tiempo de Escalamiento",
    description: "Horas antes de escalar ticket sin respuesta",
    icon: "⚡",
    category: "workflow",
    module: "helpdesk",
    type: "number",
    value: 24,
    min: 1,
    max: 168,
    unit: "horas",
    impact: "high",
    affectedUsers: 800
  },
  {
    id: "priority_levels",
    name: "Niveles de Prioridad",
    description: "Cantidad de niveles de prioridad disponibles",
    icon: "🎯",
    category: "workflow",
    module: "helpdesk",
    type: "number",
    value: 4,
    min: 2,
    max: 10,
    unit: "niveles",
    impact: "medium",
    affectedUsers: 800
  },
  {
    id: "sla_alerts",
    name: "Alertas de SLA",
    description: "Notificaciones cuando se acerca vencimiento SLA",
    icon: "⚠️",
    category: "notifications",
    module: "helpdesk",
    type: "boolean",
    value: true,
    impact: "high",
    affectedUsers: 100
  },

  // Knowledge Module
  {
    id: "article_approval",
    name: "Aprobación de Artículos",
    description: "Requiere aprobación antes de publicar",
    icon: "✅",
    category: "workflow",
    module: "knowledge",
    type: "boolean",
    value: true,
    impact: "medium",
    affectedUsers: 25
  },
  {
    id: "version_history",
    name: "Historial de Versiones",
    description: "Número máximo de versiones guardadas",
    icon: "📝",
    category: "storage",
    module: "knowledge",
    type: "number",
    value: 10,
    min: 1,
    max: 50,
    unit: "versiones",
    impact: "low",
    affectedUsers: 25
  },
  {
    id: "search_indexing",
    name: "Indexación de Búsqueda",
    description: "Actualización automática del índice de búsqueda",
    icon: "🔍",
    category: "search",
    module: "knowledge",
    type: "boolean",
    value: true,
    impact: "medium",
    affectedUsers: 2500
  },
  {
    id: "article_expiry",
    name: "Días de Expiración",
    description: "Días después de los cuales revisar artículos",
    icon: "📅",
    category: "workflow",
    module: "knowledge",
    type: "number",
    value: 365,
    min: 30,
    max: 1095,
    unit: "días",
    impact: "low",
    affectedUsers: 25
  },

  // Reports Module
  {
    id: "real_time_analytics",
    name: "Analíticas en Tiempo Real",
    description: "Dashboard con métricas en tiempo real",
    icon: "📈",
    category: "analytics",
    module: "reports",
    type: "boolean",
    value: false,
    impact: "low",
    affectedUsers: 150
  },
  {
    id: "data_retention",
    name: "Retención de Datos",
    description: "Meses de retención de datos analíticos",
    icon: "🗄️",
    category: "storage",
    module: "reports",
    type: "number",
    value: 12,
    min: 1,
    max: 60,
    unit: "meses",
    impact: "medium",
    affectedUsers: 150
  },
  {
    id: "export_format",
    name: "Formato de Exportación",
    description: "Formato predeterminado para exportar reportes",
    icon: "📤",
    category: "export",
    module: "reports",
    type: "select",
    value: "xlsx",
    options: ["pdf", "xlsx", "csv", "json"],
    impact: "low",
    affectedUsers: 150
  },
  {
    id: "scheduled_reports",
    name: "Reportes Programados",
    description: "Envío automático de reportes por email",
    icon: "📧",
    category: "notifications",
    module: "reports",
    type: "boolean",
    value: false,
    impact: "medium",
    affectedUsers: 50
  },

  // Admin Module
  {
    id: "audit_logs",
    name: "Logs de Auditoría",
    description: "Registro detallado de acciones del sistema",
    icon: "📋",
    category: "security",
    module: "admin",
    type: "boolean",
    value: false,
    impact: "high",
    affectedUsers: 25,
    dependencies: ["database_logging"]
  },
  {
    id: "backup_frequency",
    name: "Frecuencia de Respaldo",
    description: "Horas entre respaldos automáticos",
    icon: "💾",
    category: "backup",
    module: "admin",
    type: "number",
    value: 24,
    min: 1,
    max: 168,
    unit: "horas",
    impact: "high",
    affectedUsers: 2500
  },
  {
    id: "user_limit",
    name: "Límite de Usuarios",
    description: "Número máximo de usuarios activos",
    icon: "👥",
    category: "limits",
    module: "admin",
    type: "number",
    value: 1000,
    min: 10,
    max: 10000,
    unit: "usuarios",
    impact: "high",
    affectedUsers: 2500
  },
  {
    id: "maintenance_mode",
    name: "Modo Mantenimiento",
    description: "Activar modo de mantenimiento del sistema",
    icon: "🔧",
    category: "system",
    module: "admin",
    type: "boolean",
    value: false,
    impact: "high",
    affectedUsers: 2500
  }
];

interface UseParametersDataProps {
  searchTerm: string;
  selectedCategory: string;
  selectedStatus: string;
  selectedModule: string;
}

export const useParametersData = ({
  searchTerm,
  selectedCategory,
  selectedStatus,
  selectedModule
}: UseParametersDataProps) => {
  const [parameters] = useState<ParameterItem[]>(mockParameters);

  const filteredParameters = useMemo(() => {
    return parameters.filter((param) => {
      const matchesSearch = param.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          param.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || param.category === selectedCategory;
      
      const isEnabled = param.type === "boolean" ? param.value : true;
      const matchesStatus = selectedStatus === "all" || 
                           (selectedStatus === "enabled" && isEnabled) ||
                           (selectedStatus === "disabled" && !isEnabled);
      
      const matchesModule = selectedModule === "all" || param.module === selectedModule;

      return matchesSearch && matchesCategory && matchesStatus && matchesModule;
    });
  }, [parameters, searchTerm, selectedCategory, selectedStatus, selectedModule]);

  const stats: ParametersStats = useMemo(() => {
    const total = parameters.length;
    const enabled = parameters.filter(p => p.type === "boolean" ? p.value : true).length;
    const disabled = total - enabled;

    return { total, enabled, disabled };
  }, [parameters]);

  return {
    categories: mockCategories,
    modules: mockModules,
    parameters,
    filteredParameters,
    stats
  };
};