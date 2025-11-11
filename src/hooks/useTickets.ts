import { useState, useCallback } from 'react';
import { TicketDetail } from '@/lib/mockData';
import { mockTickets } from '@/lib/ticketData';
import { useNotifications } from './useNotifications';

export const useTickets = () => {
  const { showNotification } = useNotifications();
  const [tickets, setTickets] = useState<TicketDetail[]>(mockTickets);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('active'); // Changed default to 'active'
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || null;

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.customer.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status - 'active' means everything except 'closed'
    let matchesStatus = false;
    if (statusFilter === 'all') {
      matchesStatus = true;
    } else if (statusFilter === 'active') {
      matchesStatus = ticket.status !== 'closed';
    } else if (statusFilter === 'history') {
      matchesStatus = ticket.status === 'closed';
    } else {
      matchesStatus = ticket.status === statusFilter;
    }
    
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const createTicket = useCallback((ticketData: Partial<TicketDetail>) => {
    const newTicket: TicketDetail = {
      id: `TICK-${Date.now()}`,
      title: ticketData.title || 'New Ticket',
      description: ticketData.description || '',
      status: 'open',
      priority: ticketData.priority || 'medium',
      category: ticketData.category || 'General',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ticketData.tags || [],
      customer: ticketData.customer || {
        id: 'CUST-NEW',
        name: 'New Customer',
        email: 'customer@example.com',
        totalTickets: 1,
        satisfactionScore: 0
      },
      messages: [{
        id: 'MSG-1',
        content: ticketData.description || 'New ticket created',
        timestamp: new Date().toISOString(),
        author: {
          id: ticketData.customer?.id || 'CUST-NEW',
          name: ticketData.customer?.name || 'New Customer',
          type: 'customer' as const
        }
      }],
      customFields: ticketData.customFields || {},
      sla: {
        firstResponseTime: 60,
        resolutionTime: 240,
        status: 'met' as const
      }
    };

    setTickets(prev => [newTicket, ...prev]);
    setSelectedTicketId(newTicket.id);
    
    // Show notification
    showNotification({
      title: '🎫 Nuevo Ticket Creado',
      body: `${newTicket.id}: ${newTicket.title} - ${newTicket.customer.name}`,
      tag: newTicket.id,
    });
    
    return newTicket;
  }, [showNotification]);

  const updateTicket = useCallback((ticketId: string, updates: Partial<TicketDetail>) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
        : ticket
    ));
  }, []);

  const addMessage = useCallback((ticketId: string, content: string, isPrivate = false) => {
    const message = {
      id: `MSG-${Date.now()}`,
      content,
      timestamp: new Date().toISOString(),
      author: {
        id: 'AGENT-001',
        name: 'Juan Pérez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        type: 'agent' as const
      },
      isPrivate
    };

    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            messages: [...ticket.messages, message],
            updatedAt: new Date().toISOString()
          }
        : ticket
    ));
  }, []);

  return {
    tickets: filteredTickets,
    selectedTicket,
    selectedTicketId,
    searchQuery,
    statusFilter, 
    priorityFilter,
    showHistory,
    setSelectedTicketId,
    setSearchQuery,
    setStatusFilter,
    setPriorityFilter,
    setShowHistory,
    createTicket,
    updateTicket,
    addMessage
  };
};