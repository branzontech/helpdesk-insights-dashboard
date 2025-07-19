
// Definimos tipos para nuestros datos
export interface Case {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'open' | 'inProgress' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  assignedTo?: string;
  responseTime: number; // minutos
  resolutionTime?: number; // minutos
  satisfaction?: 1 | 2 | 3 | 4 | 5;
}

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  role: string;
  casesHandled: number;
  avgResponseTime: number;
  avgResolutionTime: number;
  satisfaction: number;
}

// Datos para Tiempo promedio de respuesta (últimos 7 días)
export const responseTimeData = [
  { day: "Lunes", tiempo: 25 },
  { day: "Martes", tiempo: 18 },
  { day: "Miércoles", tiempo: 30 },
  { day: "Jueves", tiempo: 22 },
  { day: "Viernes", tiempo: 15 },
  { day: "Sábado", tiempo: 12 },
  { day: "Domingo", tiempo: 10 },
];

// Datos para Casos por estado
export const casesStatusData = {
  total: 245,
  created: 42,
  inProgress: 76,
  closed: 127,
  history: [
    { month: "Ene", created: 38, inProgress: 25, closed: 48 },
    { month: "Feb", created: 45, inProgress: 30, closed: 52 },
    { month: "Mar", created: 37, inProgress: 28, closed: 41 },
    { month: "Abr", created: 50, inProgress: 35, closed: 45 },
    { month: "May", created: 42, inProgress: 32, closed: 55 },
    { month: "Jun", created: 40, inProgress: 30, closed: 60 },
  ],
};

// Datos para Casos por categoría
export const casesByCategoryData = [
  { name: "Hardware", value: 123, color: "#006D77" },
  { name: "Software", value: 87, color: "#83C5BE" },
  { name: "Desarrollo", value: 45, color: "#4A8F9F" },
  { name: "Redes", value: 32, color: "#AEDCC0" },
  { name: "Seguridad", value: 21, color: "#F4A261" },
  { name: "Otros", value: 17, color: "#FFD166" },
];

// Datos para Casos atendidos por agente
export const agentPerformanceData = [
  {
    name: "Juan Pérez",
    casesHandled: 43,
    avgResponseTime: 15,
    avgResolutionTime: 120,
    satisfaction: 4.7,
  },
  {
    name: "María López",
    casesHandled: 38,
    avgResponseTime: 12,
    avgResolutionTime: 95,
    satisfaction: 4.9,
  },
  {
    name: "Carlos Rodríguez",
    casesHandled: 35,
    avgResponseTime: 18,
    avgResolutionTime: 150,
    satisfaction: 4.5,
  },
  {
    name: "Ana Martínez",
    casesHandled: 32,
    avgResponseTime: 20,
    avgResolutionTime: 110,
    satisfaction: 4.6,
  },
  {
    name: "Roberto Sánchez",
    casesHandled: 28,
    avgResponseTime: 22,
    avgResolutionTime: 140,
    satisfaction: 4.3,
  },
];

// Datos para Indicador de satisfacción
export const satisfactionData = {
  current: 4.7,
  previous: 4.5,
  history: [
    { month: "Ene", value: 4.3 },
    { month: "Feb", value: 4.4 },
    { month: "Mar", value: 4.2 },
    { month: "Abr", value: 4.5 },
    { month: "May", value: 4.6 },
    { month: "Jun", value: 4.7 },
  ],
};

// Datos para Días más movidos de la semana
export const weeklyActivityData = [
  { day: "Lunes", cases: 48 },
  { day: "Martes", cases: 52 },
  { day: "Miércoles", cases: 45 },
  { day: "Jueves", cases: 58 },
  { day: "Viernes", cases: 42 },
  { day: "Sábado", cases: 15 },
  { day: "Domingo", cases: 8 },
];

// Datos para Tiempo promedio desde la primera respuesta
export const firstResponseTimeData = {
  avgMinutes: 18,
  previousMonth: 22,
  change: -18.2 // porcentaje de mejora
};

// Datos para Tiempo por tramo de horarios
export const timeRangeData = [
  { range: "0-5 horas", cases: 89, percentage: 36.3 },
  { range: "5-24 horas", cases: 67, percentage: 27.3 },
  { range: "1-7 días", cases: 52, percentage: 21.2 },
  { range: "7-30 días", cases: 28, percentage: 11.4 },
  { range: "> 30 días", cases: 9, percentage: 3.7 },
];
