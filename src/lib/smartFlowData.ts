import { SmartFlow, SmartFlowCategory } from '@/types/smartFlow';

export const smartFlows: SmartFlow[] = [
  {
    id: 'sf-1',
    name: 'Resolver y Cerrar',
    description: 'Envía solución estándar y cierra el ticket',
    category: 'quick-resolve',
    icon: 'CheckCircle',
    color: 'green',
    actions: [
      { id: 'a1', type: 'reply', label: 'Respuesta', value: 'Hemos revisado tu solicitud y la hemos resuelto. Si necesitas algo más, no dudes en contactarnos.' },
      { id: 'a2', type: 'status', label: 'Estado', value: 'resolved' },
      { id: 'a3', type: 'close', label: 'Cerrar', value: 'true' }
    ],
    usageCount: 42
  },
  {
    id: 'sf-2',
    name: 'Solicitar Más Información',
    description: 'Pide detalles adicionales al cliente',
    category: 'communication',
    icon: 'MessageCircle',
    color: 'blue',
    actions: [
      { id: 'a1', type: 'reply', label: 'Respuesta', value: 'Gracias por contactarnos. Para ayudarte mejor, necesitamos más información sobre tu problema. ¿Podrías proporcionar más detalles?' },
      { id: 'a2', type: 'status', label: 'Estado', value: 'pending' },
      { id: 'a3', type: 'tag', label: 'Etiqueta', value: ['requiere-info'] }
    ],
    usageCount: 38
  },
  {
    id: 'sf-3',
    name: 'Escalar a Nivel 2',
    description: 'Eleva el ticket al equipo especializado',
    category: 'escalation',
    icon: 'ArrowUpCircle',
    color: 'orange',
    actions: [
      { id: 'a1', type: 'escalate', label: 'Escalar', value: 'nivel-2' },
      { id: 'a2', type: 'priority', label: 'Prioridad', value: 'high' },
      { id: 'a3', type: 'reply', label: 'Nota Interna', value: 'Ticket escalado a nivel 2 para atención especializada.' },
      { id: 'a4', type: 'tag', label: 'Etiqueta', value: ['escalado', 'nivel-2'] }
    ],
    usageCount: 15
  },
  {
    id: 'sf-4',
    name: 'Asignar a IT',
    description: 'Asigna el ticket al departamento de IT',
    category: 'assignment',
    icon: 'Users',
    color: 'purple',
    actions: [
      { id: 'a1', type: 'assign', label: 'Asignar', value: 'dept-it' },
      { id: 'a2', type: 'tag', label: 'Etiqueta', value: ['it', 'tecnico'] },
      { id: 'a3', type: 'priority', label: 'Prioridad', value: 'medium' }
    ],
    usageCount: 28
  },
  {
    id: 'sf-5',
    name: 'Problema de Facturación',
    description: 'Maneja consultas sobre facturación',
    category: 'quick-resolve',
    icon: 'CreditCard',
    color: 'cyan',
    actions: [
      { id: 'a1', type: 'assign', label: 'Asignar', value: 'dept-billing' },
      { id: 'a2', type: 'tag', label: 'Etiqueta', value: ['facturacion', 'pagos'] },
      { id: 'a3', type: 'reply', label: 'Respuesta', value: 'Tu consulta sobre facturación ha sido recibida. Nuestro equipo de contabilidad la revisará en breve.' }
    ],
    usageCount: 19
  },
  {
    id: 'sf-6',
    name: 'Urgente - Acción Inmediata',
    description: 'Para problemas críticos que requieren atención inmediata',
    category: 'escalation',
    icon: 'AlertTriangle',
    color: 'red',
    actions: [
      { id: 'a1', type: 'priority', label: 'Prioridad', value: 'critical' },
      { id: 'a2', type: 'escalate', label: 'Escalar', value: 'gerencia' },
      { id: 'a3', type: 'assign', label: 'Asignar', value: 'supervisor' },
      { id: 'a4', type: 'tag', label: 'Etiqueta', value: ['urgente', 'critico'] }
    ],
    usageCount: 7
  }
];

export const smartFlowCategories: SmartFlowCategory[] = [
  {
    id: 'quick-resolve',
    name: 'Resolución Rápida',
    description: 'Flujos para resolver tickets comunes rápidamente',
    flows: smartFlows.filter(f => f.category === 'quick-resolve')
  },
  {
    id: 'escalation',
    name: 'Escalamiento',
    description: 'Flujos para elevar tickets a niveles superiores',
    flows: smartFlows.filter(f => f.category === 'escalation')
  },
  {
    id: 'assignment',
    name: 'Asignación',
    description: 'Flujos para asignar tickets a equipos o agentes',
    flows: smartFlows.filter(f => f.category === 'assignment')
  },
  {
    id: 'communication',
    name: 'Comunicación',
    description: 'Flujos para respuestas y seguimiento',
    flows: smartFlows.filter(f => f.category === 'communication')
  }
];
