import { Step } from 'react-joyride';

export const dashboardTourSteps: Step[] = [
  {
    target: 'body',
    content: '¡Bienvenido al Centro de Soporte! Te guiaremos por las funciones principales del sistema.',
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="sidebar-tickets"]',
    content: 'Aquí puedes acceder a la gestión de tickets. Desde aquí podrás ver, crear y administrar todos los tickets de soporte.',
    placement: 'right',
  },
  {
    target: '[data-tour="dashboard-stats"]',
    content: 'En el dashboard puedes ver estadísticas en tiempo real: tickets activos, tiempo de respuesta promedio y más métricas importantes.',
    placement: 'bottom',
  },
  {
    target: '[data-tour="sidebar-knowledge"]',
    content: 'La base de conocimientos te permite crear y gestionar artículos de ayuda para resolver problemas comunes.',
    placement: 'right',
  },
  {
    target: '[data-tour="sidebar-parameters"]',
    content: 'En parámetros puedes configurar las reglas del sistema y personalizar el comportamiento de los tickets.',
    placement: 'right',
  },
];

export const ticketsTourSteps: Step[] = [
  {
    target: '[data-tour="tickets-header"]',
    content: 'Este es el centro de gestión de tickets. Aquí puedes ver todos los tickets del sistema.',
    placement: 'bottom',
  },
  {
    target: '[data-tour="new-ticket-btn"]',
    content: 'Haz clic aquí para crear un nuevo ticket de soporte.',
    placement: 'bottom',
  },
  {
    target: '[data-tour="tickets-list"]',
    content: 'Lista de todos los tickets. Puedes filtrar por estado, prioridad y buscar por contenido.',
    placement: 'right',
  },
  {
    target: '[data-tour="ticket-filters"]',
    content: 'Usa estos filtros para encontrar rápidamente los tickets que necesitas: por estado, prioridad o historial.',
    placement: 'bottom',
  },
  {
    target: '[data-tour="ticket-view"]',
    content: 'Al seleccionar un ticket, verás todos los detalles, conversación e información del cliente en esta área.',
    placement: 'left',
  },
];

export const agentsTourSteps: Step[] = [
  {
    target: '[data-tour="agent-assignment"]',
    content: 'Los agentes se pueden asignar a tickets específicos para un mejor seguimiento y responsabilidad.',
    placement: 'top',
  },
  {
    target: '[data-tour="agent-performance"]',
    content: 'Aquí puedes ver el rendimiento de cada agente: tickets resueltos, tiempo de respuesta y evaluaciones.',
    placement: 'bottom',
  },
  {
    target: '[data-tour="ticket-priority"]',
    content: 'Los tickets se clasifican por prioridad. Los agentes deben atender primero los de alta prioridad.',
    placement: 'top',
  },
];