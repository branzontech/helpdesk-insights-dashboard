import { TicketDetail } from './mockData';

export const mockTickets: TicketDetail[] = [
  {
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
      phone: "+1 (555) 123-4567",
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
        id: "MSG-006",
        content: "It worked! Thank you so much, Juan! The email is now syncing perfectly on my iPhone. I really appreciate your quick and detailed help.",
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
      firstResponseTime: 45,
      resolutionTime: 120,
      status: "met"
    }
  },
  {
    id: "TICK-2024-002",
    title: "Software installation error on Windows laptop",
    description: "Getting error code 0x80070005 when trying to install new accounting software. Need this resolved urgently for month-end closing.",
    status: "open",
    priority: "critical",
    category: "Software Installation",
    createdAt: "2024-01-16T08:15:00Z",
    updatedAt: "2024-01-16T08:15:00Z", 
    dueDate: "2024-01-16T12:00:00Z",
    tags: ["windows", "installation", "permissions", "accounting"],
    customer: {
      id: "CUST-002",
      name: "Michael Chen",
      email: "m.chen@finance.company.com",
      phone: "+1 (555) 789-0123",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      company: "Financial Partners LLC",
      location: "San Francisco, USA",
      timezone: "PST",
      totalTickets: 8,
      satisfactionScore: 4.2
    },
    messages: [
      {
        id: "MSG-201",
        content: "Hi, I'm trying to install our new accounting software but keep getting error code 0x80070005. This is blocking our month-end process. Please help ASAP!",
        timestamp: "2024-01-16T08:15:00Z",
        author: {
          id: "CUST-002",
          name: "Michael Chen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          type: "customer"
        },
        attachments: [
          {
            id: "ATT-201",
            name: "installation-error.png",
            size: "187 KB",
            type: "image/png"
          }
        ]
      }
    ],
    customFields: {
      operatingSystem: "Windows 11 Pro",
      softwareName: "QuickBooks Enterprise",
      errorCode: "0x80070005"
    },
    sla: {
      firstResponseTime: 30,
      resolutionTime: 120,
      status: "warning"
    }
  },
  {
    id: "TICK-2024-003", 
    title: "Printer connectivity issues in conference room",
    description: "The main conference room printer stopped working after the latest Windows update. Multiple users affected.",
    status: "closed",
    priority: "medium",
    category: "Hardware",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-15T09:30:00Z",
    tags: ["printer", "network", "conference-room", "windows-update"],
    customer: {
      id: "CUST-003",
      name: "Emma Rodriguez",
      email: "e.rodriguez@hr.company.com",
      phone: "+1 (555) 456-7890",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      company: "Global Enterprises",
      location: "Chicago, USA", 
      timezone: "CST",
      totalTickets: 15,
      satisfactionScore: 4.8
    },
    assignedAgent: {
      id: "AGENT-002",
      name: "María López",
      avatar: "https://images.unsplash.com/photo-1594736797933-d0c56662bdc6?w=150&h=150&fit=crop&crop=face",
      email: "maria.lopez@support.com"
    },
    messages: [
      {
        id: "MSG-301", 
        content: "The printer in Conference Room A has stopped working. Multiple people have important presentations today. Can someone look into this?",
        timestamp: "2024-01-14T14:20:00Z",
        author: {
          id: "CUST-003",
          name: "Emma Rodriguez",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          type: "customer"
        }
      },
      {
        id: "MSG-302",
        content: "Hi Emma! I'll check the printer right away. This sounds like it might be related to yesterday's Windows updates. I'll investigate and get back to you within 30 minutes.",
        timestamp: "2024-01-14T14:35:00Z",
        author: {
          id: "AGENT-002",
          name: "María López",
          avatar: "https://images.unsplash.com/photo-1594736797933-d0c56662bdc6?w=150&h=150&fit=crop&crop=face",
          type: "agent"
        }
      },
      {
        id: "MSG-303",
        content: "Issue resolved! The Windows update had reset the printer drivers. I've reinstalled them and the printer is working perfectly now. Please test and let me know if you encounter any other issues.",
        timestamp: "2024-01-15T09:30:00Z",
        author: {
          id: "AGENT-002",
          name: "María López",
          avatar: "https://images.unsplash.com/photo-1594736797933-d0c56662bdc6?w=150&h=150&fit=crop&crop=face",
          type: "agent"
        }
      },
      {
        id: "MSG-304",
        content: "Perfect! Everything is working great now. Thank you for the quick resolution, María!",
        timestamp: "2024-01-15T10:00:00Z",
        author: {
          id: "CUST-003",
          name: "Emma Rodriguez",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          type: "customer"
        }
      }
    ],
    customFields: {
      location: "Conference Room A",
      deviceModel: "HP LaserJet Pro 4301fdw",
      affectedUsers: "12"
    },
    sla: {
      firstResponseTime: 15,
      resolutionTime: 45,
      status: "met"
    }
  },
  {
    id: "TICK-2024-004",
    title: "VPN connection failing from home office",
    description: "Cannot connect to company VPN from home. Getting timeout errors consistently.",
    status: "pending",
    priority: "high",
    category: "Network & Security",
    createdAt: "2024-01-16T07:45:00Z",
    updatedAt: "2024-01-16T11:20:00Z",
    tags: ["vpn", "remote-work", "timeout", "security"],
    customer: {
      id: "CUST-004",
      name: "David Thompson",
      email: "d.thompson@marketing.company.com",
      phone: "+1 (555) 234-5678",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      company: "Creative Solutions Inc",
      location: "Austin, USA",
      timezone: "CST",
      totalTickets: 5,
      satisfactionScore: 4.1
    },
    assignedAgent: {
      id: "AGENT-003",
      name: "Carlos Rodríguez",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      email: "carlos.rodriguez@support.com"
    },
    messages: [
      {
        id: "MSG-401",
        content: "I've been trying to connect to the company VPN all morning but it keeps timing out. I have an important client presentation this afternoon and need access to the shared files.",
        timestamp: "2024-01-16T07:45:00Z",
        author: {
          id: "CUST-004", 
          name: "David Thompson",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
          type: "customer"
        }
      },
      {
        id: "MSG-402",
        content: "Hi David! I understand how urgent this is. Let me run some diagnostics on the VPN server. In the meantime, can you try connecting from a different location or using your mobile hotspot to rule out ISP issues?",
        timestamp: "2024-01-16T08:15:00Z",
        author: {
          id: "AGENT-003",
          name: "Carlos Rodríguez", 
          avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
          type: "agent"
        }
      },
      {
        id: "MSG-403",
        content: "We've identified a server configuration issue that's affecting some users. I'm working with our network team to resolve this. I'll update you within the next hour.",
        timestamp: "2024-01-16T11:20:00Z",
        author: {
          id: "AGENT-003",
          name: "Carlos Rodríguez",
          avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
          type: "agent"
        },
        isPrivate: true
      }
    ],
    customFields: {
      connectionType: "Home Broadband",
      vpnClient: "OpenVPN Connect",
      errorType: "Connection Timeout"
    },
    sla: {
      firstResponseTime: 30,
      resolutionTime: 180,
      status: "warning"
    }
  }
];