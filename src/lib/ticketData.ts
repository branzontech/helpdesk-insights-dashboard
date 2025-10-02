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
  },
  {
    id: "TICK-2024-005",
    title: "Database connection timeout errors",
    description: "Getting intermittent database timeouts on the main application. Affecting customer transactions.",
    status: "open",
    priority: "critical",
    category: "Database",
    createdAt: "2024-01-16T10:30:00Z",
    updatedAt: "2024-01-16T10:30:00Z",
    tags: ["database", "timeout", "performance", "transactions"],
    customer: {
      id: "CUST-005",
      name: "Lisa Wang",
      email: "l.wang@operations.company.com",
      phone: "+1 (555) 345-6789",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      company: "Operations Central",
      location: "Seattle, USA",
      timezone: "PST",
      totalTickets: 3,
      satisfactionScore: 4.7
    },
    messages: [],
    customFields: {
      environment: "Production",
      errorRate: "15%"
    },
    sla: {
      firstResponseTime: 15,
      resolutionTime: 60,
      status: "breached"
    }
  },
  {
    id: "TICK-2024-006",
    title: "Password reset not working",
    description: "Users cannot reset their passwords. Reset emails are not being sent.",
    status: "inProgress",
    priority: "high",
    category: "Authentication",
    createdAt: "2024-01-15T16:20:00Z",
    updatedAt: "2024-01-16T09:15:00Z",
    tags: ["password", "email", "authentication", "smtp"],
    customer: {
      id: "CUST-006",
      name: "Robert Martinez",
      email: "r.martinez@security.company.com",
      phone: "+1 (555) 567-8901",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      company: "Security First",
      location: "Miami, USA",
      timezone: "EST",
      totalTickets: 7,
      satisfactionScore: 4.3
    },
    assignedAgent: {
      id: "AGENT-001",
      name: "Juan Pérez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      email: "juan.perez@support.com"
    },
    messages: [
      {
        id: "MSG-601",
        content: "Multiple users are reporting that password reset emails are not being sent. This is affecting productivity across the organization.",
        timestamp: "2024-01-15T16:20:00Z",
        author: {
          id: "CUST-006",
          name: "Robert Martinez",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          type: "customer"
        }
      }
    ],
    customFields: {
      affectedUsers: "25+",
      smtpServer: "smtp.company.com"
    },
    sla: {
      firstResponseTime: 45,
      resolutionTime: 240,
      status: "met"
    }
  },
  {
    id: "TICK-2024-007",
    title: "Slow website loading times",
    description: "Company website is loading very slowly for customers. Multiple complaints received.",
    status: "open",
    priority: "medium",
    category: "Performance",
    createdAt: "2024-01-16T11:45:00Z",
    updatedAt: "2024-01-16T11:45:00Z",
    tags: ["website", "performance", "loading", "customer-facing"],
    customer: {
      id: "CUST-007",
      name: "Angela Foster",
      email: "a.foster@web.company.com",
      phone: "+1 (555) 678-9012",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      company: "Web Solutions",
      location: "Portland, USA",
      timezone: "PST",
      totalTickets: 11,
      satisfactionScore: 4.6
    },
    messages: [],
    customFields: {
      loadTime: "8.5 seconds",
      server: "AWS EC2"
    },
    sla: {
      firstResponseTime: 60,
      resolutionTime: 480,
      status: "met"
    }
  },
  {
    id: "TICK-2024-008",
    title: "Mobile app crashes on startup",
    description: "iOS app crashes immediately after opening. Affecting all iOS 17+ users.",
    status: "pending",
    priority: "critical",
    category: "Mobile App",
    createdAt: "2024-01-16T08:00:00Z",
    updatedAt: "2024-01-16T12:30:00Z",
    tags: ["mobile", "ios", "crash", "startup"],
    customer: {
      id: "CUST-008",
      name: "Kevin Park",
      email: "k.park@mobile.company.com",
      phone: "+1 (555) 789-0123",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      company: "Mobile First",
      location: "Los Angeles, USA",
      timezone: "PST",
      totalTickets: 4,
      satisfactionScore: 4.4
    },
    assignedAgent: {
      id: "AGENT-002",
      name: "María López",
      avatar: "https://images.unsplash.com/photo-1594736797933-d0c56662bdc6?w=150&h=150&fit=crop&crop=face",
      email: "maria.lopez@support.com"
    },
    messages: [
      {
        id: "MSG-801",
        content: "The iOS app is crashing for all users with iOS 17 and above. This is a critical issue affecting our mobile user base.",
        timestamp: "2024-01-16T08:00:00Z",
        author: {
          id: "CUST-008",
          name: "Kevin Park",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          type: "customer"
        }
      }
    ],
    customFields: {
      platform: "iOS 17+",
      crashRate: "100%",
      appVersion: "2.1.5"
    },
    sla: {
      firstResponseTime: 15,
      resolutionTime: 120,
      status: "breached"
    }
  },
  {
    id: "TICK-2024-009",
    title: "SSL certificate expiring soon",
    description: "Main website SSL certificate will expire in 3 days. Need renewal urgently.",
    status: "closed",
    priority: "high",
    category: "Security",
    createdAt: "2024-01-16T13:15:00Z",
    updatedAt: "2024-01-17T18:30:00Z",
    tags: ["ssl", "certificate", "security", "website"],
    customer: {
      id: "CUST-009",
      name: "Sandra Kim",
      email: "s.kim@security.company.com",
      phone: "+1 (555) 890-1234",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      company: "SecureWeb Inc",
      location: "Boston, USA",
      timezone: "EST",
      totalTickets: 6,
      satisfactionScore: 4.9
    },
    assignedAgent: {
      id: "AGENT-002",
      name: "María López",
      avatar: "https://images.unsplash.com/photo-1594736797933-d0c56662bdc6?w=150&h=150&fit=crop&crop=face",
      email: "maria.lopez@support.com"
    },
    messages: [
      {
        id: "MSG-901",
        content: "Our SSL certificate for www.secureweb.com is expiring in 3 days (January 19th). We need this renewed urgently to avoid any service interruption.",
        timestamp: "2024-01-16T13:15:00Z",
        author: {
          id: "CUST-009",
          name: "Sandra Kim",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          type: "customer"
        }
      },
      {
        id: "MSG-902",
        content: "AGENT_ASSIGNED: María López has been assigned to this ticket.",
        timestamp: "2024-01-16T13:20:00Z",
        author: {
          id: "SYSTEM",
          name: "System",
          avatar: "",
          type: "system"
        },
        metadata: {
          type: "agent_assigned",
          agentId: "AGENT-002",
          agentName: "María López",
          agentAvatar: "https://images.unsplash.com/photo-1594736797933-d0c56662bdc6?w=150&h=150&fit=crop&crop=face"
        }
      },
      {
        id: "MSG-903",
        content: "Hello Sandra, I've received your ticket and I'm looking into the SSL certificate renewal process right away. I'll get this sorted out for you.",
        timestamp: "2024-01-16T13:25:00Z",
        author: {
          id: "AGENT-002",
          name: "María López",
          avatar: "https://images.unsplash.com/photo-1594736797933-d0c56662bdc6?w=150&h=150&fit=crop&crop=face",
          type: "agent"
        }
      },
      {
        id: "MSG-904",
        content: "ESCALATED: This ticket has been escalated to Level 2 Support - Security Team due to certificate authority validation requirements.",
        timestamp: "2024-01-16T14:30:00Z",
        author: {
          id: "SYSTEM",
          name: "System",
          avatar: "",
          type: "system"
        },
        metadata: {
          type: "escalated",
          escalationLevel: "Level 2 Support - Security Team",
          reason: "Certificate authority validation requirements"
        }
      },
      {
        id: "MSG-905",
        content: "The certificate renewal has been completed successfully. The new certificate is valid until January 16, 2025. All systems are showing secure connection status.",
        timestamp: "2024-01-17T10:15:00Z",
        author: {
          id: "AGENT-002",
          name: "María López",
          avatar: "https://images.unsplash.com/photo-1594736797933-d0c56662bdc6?w=150&h=150&fit=crop&crop=face",
          type: "agent"
        }
      },
      {
        id: "MSG-906",
        content: "Excellent work! Everything is working perfectly. Thank you for the quick turnaround.",
        timestamp: "2024-01-17T11:45:00Z",
        author: {
          id: "CUST-009",
          name: "Sandra Kim",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          type: "customer"
        }
      },
      {
        id: "MSG-907",
        content: "RATING: Customer rated this ticket 5 stars. Feedback: Fast response and professional handling of a critical security issue.",
        timestamp: "2024-01-17T18:30:00Z",
        author: {
          id: "SYSTEM",
          name: "System",
          avatar: "",
          type: "system"
        },
        metadata: {
          type: "rating",
          rating: 5,
          feedback: "Fast response and professional handling of a critical security issue."
        }
      }
    ],
    customFields: {
      expiryDate: "2024-01-19",
      certificateType: "Wildcard SSL",
      renewedUntil: "2025-01-16"
    },
    sla: {
      firstResponseTime: 30,
      resolutionTime: 240,
      status: "met"
    }
  },
  {
    id: "TICK-2024-010",
    title: "Backup system failed last night",
    description: "Automated backup process failed. Need to investigate and ensure data safety.",
    status: "inProgress",
    priority: "high",
    category: "Backup & Recovery",
    createdAt: "2024-01-16T06:30:00Z",
    updatedAt: "2024-01-16T10:45:00Z",
    tags: ["backup", "failure", "data", "automation"],
    customer: {
      id: "CUST-010",
      name: "James Wilson",
      email: "j.wilson@data.company.com",
      phone: "+1 (555) 901-2345",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      company: "DataSafe Corp",
      location: "Denver, USA",
      timezone: "MST",
      totalTickets: 9,
      satisfactionScore: 4.5
    },
    assignedAgent: {
      id: "AGENT-003",
      name: "Carlos Rodríguez",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      email: "carlos.rodriguez@support.com"
    },
    messages: [
      {
        id: "MSG-1001",
        content: "Our automated backup system failed last night at 2:30 AM. The error logs show a disk space issue, but I need technical help to investigate further.",
        timestamp: "2024-01-16T06:30:00Z",
        author: {
          id: "CUST-010",
          name: "James Wilson",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
          type: "customer"
        }
      }
    ],
    customFields: {
      backupSize: "2.3 TB",
      errorCode: "DISK_FULL",
      lastSuccessful: "2024-01-14"
    },
    sla: {
      firstResponseTime: 30,
      resolutionTime: 360,
      status: "met"
    }
  },
  {
    id: "TICK-2024-011",
    title: "User unable to upload files",
    description: "File upload feature not working in the web application. Getting permission errors.",
    status: "closed",
    priority: "medium",
    category: "File Management",
    createdAt: "2024-01-16T14:20:00Z",
    updatedAt: "2024-01-17T16:45:00Z",
    tags: ["upload", "files", "permissions", "web-app"],
    customer: {
      id: "CUST-011",
      name: "Rachel Green",
      email: "r.green@files.company.com",
      phone: "+1 (555) 012-3456",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b993?w=150&h=150&fit=crop&crop=face",
      company: "FileShare Pro",
      location: "Phoenix, USA",
      timezone: "MST",
      totalTickets: 2,
      satisfactionScore: 4.0
    },
    assignedAgent: {
      id: "AGENT-003",
      name: "Carlos Rodríguez",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      email: "carlos.rodriguez@support.com"
    },
    messages: [
      {
        id: "MSG-1101",
        content: "Hi, I'm having trouble uploading files to our web application. Every time I try to upload a PDF, I get a permission error. This is blocking my work.",
        timestamp: "2024-01-16T14:20:00Z",
        author: {
          id: "CUST-011",
          name: "Rachel Green",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b993?w=150&h=150&fit=crop&crop=face",
          type: "customer"
        }
      },
      {
        id: "MSG-1102",
        content: "Hello Rachel! I'll help you with the file upload issue. Let me check the server permissions and get back to you shortly.",
        timestamp: "2024-01-16T14:30:00Z",
        author: {
          id: "AGENT-003",
          name: "Carlos Rodríguez",
          avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
          type: "agent"
        }
      },
      {
        id: "MSG-1103",
        content: "I've found the issue - it's a server configuration problem that requires escalation to our backend team. This ticket has been escalado to Level 2 support for immediate attention.",
        timestamp: "2024-01-16T15:15:00Z",
        author: {
          id: "AGENT-003",
          name: "Carlos Rodríguez",
          avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
          type: "agent"
        }
      },
      {
        id: "MSG-1104",
        content: "Unfortunately, the initial solution we proposed was rechazado by the security team due to compliance issues. We need to implement a different approach.",
        timestamp: "2024-01-16T16:30:00Z",
        author: {
          id: "AGENT-003",
          name: "Carlos Rodríguez",
          avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
          type: "agent"
        },
        isPrivate: true
      },
      {
        id: "MSG-1105",
        content: "Good news! We've implemented a secure file upload solution that meets all compliance requirements. Please try uploading your files now.",
        timestamp: "2024-01-17T10:20:00Z",
        author: {
          id: "AGENT-003",
          name: "Carlos Rodríguez",
          avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
          type: "agent"
        }
      },
      {
        id: "MSG-1106",
        content: "Perfect! The file upload is working now. Thank you for resolving this issue. I would like to give this ticket a calificación of 2 estrellas. Motivo: The resolution took too long and required multiple escalations.",
        timestamp: "2024-01-17T14:30:00Z",
        author: {
          id: "CUST-011",
          name: "Rachel Green",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b993?w=150&h=150&fit=crop&crop=face",
          type: "customer"
        }
      },
      {
        id: "MSG-1107",
        content: "Thank you for your feedback, Rachel. I understand your frustration with the extended resolution time. We'll use this feedback to improve our processes.",
        timestamp: "2024-01-17T16:45:00Z",
        author: {
          id: "AGENT-003",
          name: "Carlos Rodríguez",
          avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
          type: "agent"
        }
      }
    ],
    customFields: {
      fileSize: "15 MB",
      fileType: "PDF",
      browser: "Chrome 120"
    },
    sla: {
      firstResponseTime: 60,
      resolutionTime: 480,
      status: "met"
    }
  },
  {
    id: "TICK-2024-012",
    title: "API rate limiting issues",
    description: "Third-party API integration hitting rate limits too frequently. Need optimization.",
    status: "pending",
    priority: "low",
    category: "API Integration",
    createdAt: "2024-01-15T11:30:00Z",
    updatedAt: "2024-01-16T09:00:00Z",
    tags: ["api", "rate-limit", "integration", "optimization"],
    customer: {
      id: "CUST-012",
      name: "Tom Anderson",
      email: "t.anderson@api.company.com",
      phone: "+1 (555) 123-0987",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      company: "API Solutions",
      location: "Atlanta, USA",
      timezone: "EST",
      totalTickets: 13,
      satisfactionScore: 4.2
    },
    assignedAgent: {
      id: "AGENT-001",
      name: "Juan Pérez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      email: "juan.perez@support.com"
    },
    messages: [
      {
        id: "MSG-1201",
        content: "We're hitting the API rate limits too often during peak hours. Can we optimize the call frequency or upgrade our plan?",
        timestamp: "2024-01-15T11:30:00Z",
        author: {
          id: "CUST-012",
          name: "Tom Anderson",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          type: "customer"
        }
      }
    ],
    customFields: {
      apiProvider: "External Service",
      currentLimit: "1000/hour",
      usage: "950/hour"
    },
    sla: {
      firstResponseTime: 120,
      resolutionTime: 720,
      status: "met"
    }
  }
];