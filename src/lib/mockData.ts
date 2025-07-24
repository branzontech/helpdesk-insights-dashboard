
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

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  company?: string;
  location?: string;
  timezone?: string;
  totalTickets: number;
  satisfactionScore: number;
}

export interface TicketMessage {
  id: string;
  content: string;
  timestamp: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    type: 'customer' | 'agent' | 'system';
  };
  attachments?: Array<{
    id: string;
    name: string;
    size: string;
    type: string;
  }>;
  isPrivate?: boolean;
}

export interface TicketDetail {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'inProgress' | 'closed' | 'pending';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  tags: string[];
  customer: Customer;
  assignedAgent?: {
    id: string;
    name: string;
    avatar: string;
    email: string;
  };
  messages: TicketMessage[];
  customFields?: Record<string, any>;
  sla?: {
    firstResponseTime: number;
    resolutionTime: number;
    status: 'met' | 'warning' | 'breached';
  };
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

// Mock data for ticket management
export const mockTicketDetail: TicketDetail = {
  id: "TICK-2024-001",
  title: "Unable to access company email on mobile device",
  description: "I'm having trouble setting up my company email on my iPhone. I've tried multiple times but keep getting authentication errors.",
  status: "inProgress",
  priority: "high",
  category: "Email & Communication",
  createdAt: "2024-01-15T09:30:00Z",
  updatedAt: "2024-01-15T14:45:00Z",
  dueDate: "2024-01-16T17:00:00Z",
  tags: ["email", "mobile", "authentication", "iOS"],
  customer: {
    id: "CUST-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b993?w=150&h=150&fit=crop&crop=face",
    company: "TechCorp Solutions",
    location: "New York, USA",
    timezone: "EST",
    totalTickets: 12,
    satisfactionScore: 4.5
  },
  assignedAgent: {
    id: "AGENT-001",
    name: "Juan Pérez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    email: "juan.perez@support.com"
  },
  messages: [
    {
      id: "MSG-001",
      content: "Hi there! I'm having trouble setting up my company email on my iPhone. I've tried multiple times but keep getting authentication errors. The error message says 'Cannot verify server identity'. Can you help me with this?",
      timestamp: "2024-01-15T09:30:00Z",
      author: {
        id: "CUST-001",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b993?w=150&h=150&fit=crop&crop=face",
        type: "customer"
      },
      attachments: [
        {
          id: "ATT-001",
          name: "error-screenshot.png",
          size: "245 KB",
          type: "image/png"
        }
      ]
    },
    {
      id: "MSG-002",
      content: "Hello Sarah! Thank you for contacting our support team. I understand you're experiencing difficulties setting up your company email on your iPhone. The 'Cannot verify server identity' error typically occurs when there's an SSL certificate issue or incorrect server settings.\n\nLet me help you resolve this. Could you please provide me with:\n1. Your iPhone model and iOS version\n2. The email app you're trying to use (native Mail app or third-party)\n3. The exact error message screenshot you've attached\n\nI'll guide you through the correct configuration steps.",
      timestamp: "2024-01-15T10:15:00Z",
      author: {
        id: "AGENT-001",
        name: "Juan Pérez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        type: "agent"
      }
    },
    {
      id: "MSG-003",
      content: "Hi Juan! Thank you for the quick response. Here are the details:\n\n1. iPhone 14 Pro, iOS 17.2\n2. Using the native Mail app\n3. I've attached the screenshot in my previous message\n\nI've been trying to set this up for the past hour and it's quite frustrating. I need access to my emails urgently for a client meeting this afternoon.",
      timestamp: "2024-01-15T10:45:00Z",
      author: {
        id: "CUST-001",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b993?w=150&h=150&fit=crop&crop=face",
        type: "customer"
      }
    },
    {
      id: "MSG-004",
      content: "Perfect! I can see the issue from your screenshot. The problem is with the SSL settings for the incoming mail server. Let me walk you through the correct configuration:\n\n**IMAP Settings for iPhone:**\n- Incoming Mail Server: mail.company.com\n- Username: sarah.johnson@company.com\n- Password: [your email password]\n- Port: 993\n- SSL: ON\n- Authentication: Password\n\n**SMTP Settings:**\n- Outgoing Mail Server: smtp.company.com\n- Port: 587\n- SSL: ON (STARTTLS)\n- Authentication: Password\n\nPlease try these settings and let me know if you encounter any issues. I'll stay online to assist you further.",
      timestamp: "2024-01-15T11:00:00Z",
      author: {
        id: "AGENT-001",
        name: "Juan Pérez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        type: "agent"
      }
    },
    {
      id: "MSG-005",
      content: "Ticket priority elevated to HIGH due to urgent business need for client meeting.",
      timestamp: "2024-01-15T11:05:00Z",
      author: {
        id: "SYSTEM",
        name: "System",
        type: "system"
      },
      isPrivate: true
    },
    {
      id: "MSG-006",
      content: "It worked! Thank you so much, Juan! The email is now syncing perfectly on my iPhone. I really appreciate your quick and detailed help. The step-by-step instructions were exactly what I needed.",
      timestamp: "2024-01-15T11:30:00Z",
      author: {
        id: "CUST-001",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b993?w=150&h=150&fit=crop&crop=face",
        type: "customer"
      }
    }
  ],
  customFields: {
    deviceType: "iPhone 14 Pro",
    osVersion: "iOS 17.2",
    urgency: "Business Critical",
    department: "Sales"
  },
  sla: {
    firstResponseTime: 45, // minutes
    resolutionTime: 120, // minutes
    status: "met"
  }
};
