import type { Permission, Role, User, PermissionCategory } from '@/types/permissions';

export const mockPermissions: Permission[] = [
  // Dashboard Permissions
  {
    id: 'dashboard_view',
    name: 'Ver Dashboard',
    description: 'Acceso a la vista principal del dashboard',
    category: 'dashboard',
    resource: 'dashboard',
    action: 'view'
  },
  {
    id: 'dashboard_export',
    name: 'Exportar Dashboard',
    description: 'Exportar datos y reportes del dashboard',
    category: 'dashboard',
    resource: 'dashboard',
    action: 'export'
  },

  // Tickets Permissions
  {
    id: 'tickets_view',
    name: 'Ver Tickets',
    description: 'Visualizar lista de tickets',
    category: 'tickets',
    resource: 'tickets',
    action: 'view'
  },
  {
    id: 'tickets_create',
    name: 'Crear Tickets',
    description: 'Crear nuevos tickets en el sistema',
    category: 'tickets',
    resource: 'tickets',
    action: 'create'
  },
  {
    id: 'tickets_edit',
    name: 'Editar Tickets',
    description: 'Modificar tickets existentes',
    category: 'tickets',
    resource: 'tickets',
    action: 'edit'
  },
  {
    id: 'tickets_delete',
    name: 'Eliminar Tickets',
    description: 'Eliminar tickets del sistema',
    category: 'tickets',
    resource: 'tickets',
    action: 'delete'
  },
  {
    id: 'tickets_assign',
    name: 'Asignar Tickets',
    description: 'Asignar tickets a otros usuarios',
    category: 'tickets',
    resource: 'tickets',
    action: 'assign'
  },

  // Users Permissions
  {
    id: 'users_view',
    name: 'Ver Usuarios',
    description: 'Visualizar lista de usuarios',
    category: 'users',
    resource: 'users',
    action: 'view'
  },
  {
    id: 'users_create',
    name: 'Crear Usuarios',
    description: 'Crear nuevos usuarios en el sistema',
    category: 'users',
    resource: 'users',
    action: 'create'
  },
  {
    id: 'users_edit',
    name: 'Editar Usuarios',
    description: 'Modificar información de usuarios',
    category: 'users',
    resource: 'users',
    action: 'edit'
  },
  {
    id: 'users_delete',
    name: 'Eliminar Usuarios',
    description: 'Eliminar usuarios del sistema',
    category: 'users',
    resource: 'users',
    action: 'delete'
  },

  // Reports Permissions
  {
    id: 'reports_view',
    name: 'Ver Reportes',
    description: 'Acceso a reportes y análisis',
    category: 'reports',
    resource: 'reports',
    action: 'view'
  },
  {
    id: 'reports_create',
    name: 'Crear Reportes',
    description: 'Generar nuevos reportes',
    category: 'reports',
    resource: 'reports',
    action: 'create'
  },
  {
    id: 'reports_export',
    name: 'Exportar Reportes',
    description: 'Exportar reportes en diferentes formatos',
    category: 'reports',
    resource: 'reports',
    action: 'export'
  },

  // Settings Permissions
  {
    id: 'settings_view',
    name: 'Ver Configuración',
    description: 'Acceso a la configuración del sistema',
    category: 'settings',
    resource: 'settings',
    action: 'view'
  },
  {
    id: 'settings_edit',
    name: 'Editar Configuración',
    description: 'Modificar configuración del sistema',
    category: 'settings',
    resource: 'settings',
    action: 'edit'
  },

  // Knowledge Base Permissions
  {
    id: 'knowledge_view',
    name: 'Ver Base de Conocimiento',
    description: 'Acceso a la base de conocimiento',
    category: 'knowledge',
    resource: 'knowledge',
    action: 'view'
  },
  {
    id: 'knowledge_create',
    name: 'Crear Artículos',
    description: 'Crear nuevos artículos en la base de conocimiento',
    category: 'knowledge',
    resource: 'knowledge',
    action: 'create'
  },
  {
    id: 'knowledge_edit',
    name: 'Editar Artículos',
    description: 'Modificar artículos existentes',
    category: 'knowledge',
    resource: 'knowledge',
    action: 'edit'
  },

  // System Permissions
  {
    id: 'system_backup',
    name: 'Realizar Respaldos',
    description: 'Ejecutar respaldos del sistema',
    category: 'system',
    resource: 'system',
    action: 'backup'
  },
  {
    id: 'system_logs',
    name: 'Ver Logs del Sistema',
    description: 'Acceso a los registros del sistema',
    category: 'system',
    resource: 'system',
    action: 'logs'
  }
];

export const mockRoles: Role[] = [
  {
    id: 'super_admin',
    name: 'Super Administrador',
    description: 'Acceso completo a todas las funcionalidades del sistema',
    color: '#DC2626',
    permissions: mockPermissions.map(p => p.id),
    isSystem: true
  },
  {
    id: 'admin',
    name: 'Administrador',
    description: 'Gestión completa excepto configuración del sistema',
    color: '#EA580C',
    permissions: [
      'dashboard_view', 'dashboard_export',
      'tickets_view', 'tickets_create', 'tickets_edit', 'tickets_assign',
      'users_view', 'users_create', 'users_edit',
      'reports_view', 'reports_create', 'reports_export',
      'settings_view',
      'knowledge_view', 'knowledge_create', 'knowledge_edit'
    ],
    isSystem: false
  },
  {
    id: 'agent',
    name: 'Agente',
    description: 'Gestión de tickets y acceso a herramientas básicas',
    color: '#059669',
    permissions: [
      'dashboard_view',
      'tickets_view', 'tickets_create', 'tickets_edit',
      'reports_view',
      'knowledge_view', 'knowledge_create'
    ],
    isSystem: false
  },
  {
    id: 'supervisor',
    name: 'Supervisor',
    description: 'Supervisión de agentes y reportes avanzados',
    color: '#7C3AED',
    permissions: [
      'dashboard_view', 'dashboard_export',
      'tickets_view', 'tickets_create', 'tickets_edit', 'tickets_assign',
      'users_view',
      'reports_view', 'reports_create', 'reports_export',
      'knowledge_view', 'knowledge_create', 'knowledge_edit'
    ],
    isSystem: false
  },
  {
    id: 'viewer',
    name: 'Observador',
    description: 'Solo lectura, acceso limitado para consultas',
    color: '#6B7280',
    permissions: [
      'dashboard_view',
      'tickets_view',
      'reports_view',
      'knowledge_view'
    ],
    isSystem: false
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana García',
    email: 'ana.garcia@company.com',
    roleId: 'super_admin',
    status: 'active',
    lastLogin: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2',
    name: 'Carlos López',
    email: 'carlos.lopez@company.com',
    roleId: 'admin',
    status: 'active',
    lastLogin: new Date('2024-01-15T09:15:00')
  },
  {
    id: '3',
    name: 'María Rodriguez',
    email: 'maria.rodriguez@company.com',
    roleId: 'agent',
    status: 'active',
    lastLogin: new Date('2024-01-15T08:45:00')
  },
  {
    id: '4',
    name: 'Juan Pérez',
    email: 'juan.perez@company.com',
    roleId: 'supervisor',
    status: 'active',
    lastLogin: new Date('2024-01-14T16:20:00')
  },
  {
    id: '5',
    name: 'Sofia Martín',
    email: 'sofia.martin@company.com',
    roleId: 'agent',
    status: 'inactive',
    lastLogin: new Date('2024-01-10T14:30:00')
  },
  {
    id: '6',
    name: 'Diego Fernández',
    email: 'diego.fernandez@company.com',
    roleId: 'viewer',
    status: 'pending'
  }
];

export const permissionCategories: PermissionCategory[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Permisos relacionados con el dashboard principal',
    permissions: mockPermissions.filter(p => p.category === 'dashboard')
  },
  {
    id: 'tickets',
    name: 'Tickets',
    description: 'Gestión y administración de tickets',
    permissions: mockPermissions.filter(p => p.category === 'tickets')
  },
  {
    id: 'users',
    name: 'Usuarios',
    description: 'Administración de usuarios del sistema',
    permissions: mockPermissions.filter(p => p.category === 'users')
  },
  {
    id: 'reports',
    name: 'Reportes',
    description: 'Generación y visualización de reportes',
    permissions: mockPermissions.filter(p => p.category === 'reports')
  },
  {
    id: 'settings',
    name: 'Configuración',
    description: 'Configuración del sistema',
    permissions: mockPermissions.filter(p => p.category === 'settings')
  },
  {
    id: 'knowledge',
    name: 'Base de Conocimiento',
    description: 'Gestión de artículos y documentación',
    permissions: mockPermissions.filter(p => p.category === 'knowledge')
  },
  {
    id: 'system',
    name: 'Sistema',
    description: 'Operaciones de sistema y mantenimiento',
    permissions: mockPermissions.filter(p => p.category === 'system')
  }
];