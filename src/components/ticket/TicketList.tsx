import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Clock, 
  User, 
  AlertCircle, 
  CheckCircle2, 
  Pause,
  MoreVertical,
  SortDesc,
  Calendar,
  Tag as TagIcon,
  Phone,
  History,
  Eye,
  EyeOff,
  BarChart3
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TicketDetail } from '@/lib/mockData';
import { formatDistanceToNow, format } from 'date-fns';

interface TicketListProps {
  tickets: TicketDetail[];
  selectedTicketId: string | null;
  onTicketSelect: (ticketId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (priority: string) => void;
  showHistory?: boolean;
  onShowHistoryChange?: (show: boolean) => void;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'open': return <AlertCircle className="h-4 w-4 text-blue-500" />;
    case 'inProgress': return <Clock className="h-4 w-4 text-orange-500" />;
    case 'pending': return <Pause className="h-4 w-4 text-yellow-500" />;
    case 'closed': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return 'border-l-blue-500';
    case 'inProgress': return 'border-l-orange-500';
    case 'pending': return 'border-l-yellow-500';
    case 'closed': return 'border-l-green-500';
    default: return 'border-l-gray-500';
  }
};

const getPriorityBadge = (priority: string) => {
  const colors = {
    critical: 'bg-red-500 text-red-50',
    high: 'bg-orange-500 text-orange-50',
    medium: 'bg-yellow-500 text-yellow-50',
    low: 'bg-green-500 text-green-50'
  };
  return colors[priority as keyof typeof colors] || 'bg-gray-500 text-gray-50';
};

const getPriorityDot = (priority: string) => {
  const colors = {
    critical: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  };
  return colors[priority as keyof typeof colors] || 'bg-gray-500';
};

const TicketList: React.FC<TicketListProps> = ({
  tickets,
  selectedTicketId,
  onTicketSelect,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  showHistory,
  onShowHistoryChange
}) => {
  const [sortBy, setSortBy] = useState<'created' | 'updated' | 'priority'>('updated');
  const [showStats, setShowStats] = useState<boolean>(false);

  const sortedTickets = [...tickets].sort((a, b) => {
    switch (sortBy) {
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'updated':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case 'priority':
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - 
               (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
      default:
        return 0;
    }
  });

  const statusCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const priorityCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Minimalist Header */}
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium">Tickets</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowStats(!showStats)}
              className="h-7 px-2"
            >
              {showStats ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <div className="text-sm text-muted-foreground">
              {tickets.length}
            </div>
          </div>
        </div>

        {/* Statistics Panel - Collapsible */}
        {showStats && (
          <div className="space-y-3 bg-muted/30 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Estadísticas</span>
            </div>
            
            {/* Status Counts */}
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2">Por Estado</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <AlertCircle className="h-3 w-3 text-blue-500" />
                    <span>Abiertos</span>
                  </div>
                  <span className="font-medium">{statusCounts.open || 0}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-orange-500" />
                    <span>En Progreso</span>
                  </div>
                  <span className="font-medium">{statusCounts.inProgress || 0}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <Pause className="h-3 w-3 text-yellow-500" />
                    <span>Pendientes</span>
                  </div>
                  <span className="font-medium">{statusCounts.pending || 0}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    <span>Cerrados</span>
                  </div>
                  <span className="font-medium">{statusCounts.closed || 0}</span>
                </div>
              </div>
            </div>

            <Separator className="my-2" />

            {/* Priority Counts */}
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2">Por Prioridad</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Crítico</span>
                  </div>
                  <span className="font-medium">{priorityCounts.critical || 0}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span>Alto</span>
                  </div>
                  <span className="font-medium">{priorityCounts.high || 0}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span>Medio</span>
                  </div>
                  <span className="font-medium">{priorityCounts.medium || 0}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Bajo</span>
                  </div>
                  <span className="font-medium">{priorityCounts.low || 0}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-9"
          />
        </div>

        {/* Compact Filters */}
        <div className="flex space-x-2">
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-28 h-8 text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Activos</SelectItem>
              <SelectItem value="open">Abiertos</SelectItem>
              <SelectItem value="inProgress">En Progreso</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
              <SelectItem value="history">Histórico</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
            <SelectTrigger className="w-24 h-8 text-xs">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <SortDesc className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy('updated')}>
                Recently Updated
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('created')}>
                Recently Created
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('priority')}>
                Priority
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Ticket List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {sortedTickets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium">No tickets found</h3>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          ) : (
            sortedTickets.map((ticket) => (
              <Card
                key={ticket.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-sm border-l-4 group ${
                  selectedTicketId === ticket.id 
                    ? 'ring-1 ring-primary' 
                    : ''
                } ${getStatusColor(ticket.status)}`}
                onClick={() => onTicketSelect(ticket.id)}
              >
                <CardContent className="p-3">
                  <div className="space-y-2">
                     {/* Header - Simplified */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <div className={`w-2 h-2 rounded-full ${getPriorityDot(ticket.priority)}`} />
                        <Badge 
                          variant="secondary" 
                          className={`text-xs px-2 py-0 ${getPriorityBadge(ticket.priority)}`}
                        >
                          {ticket.priority.toUpperCase()}
                        </Badge>
                        <span className="text-xs font-mono text-muted-foreground">
                          #{ticket.id}
                        </span>
                        <div className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Assign Agent</DropdownMenuItem>
                          <DropdownMenuItem>Change Priority</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Title */}
                    <h3 className="font-medium text-sm leading-tight line-clamp-2 pr-2">
                      {ticket.title}
                    </h3>

                    {/* Customer Info - Compact */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={ticket.customer.avatar} />
                          <AvatarFallback className="text-xs">
                            {ticket.customer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0 flex-1">
                          <div className="text-xs text-muted-foreground truncate">
                            {ticket.customer.name}
                          </div>
                          {ticket.customer.phone && (
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground/70">
                              <Phone className="h-3 w-3" />
                              <span className="truncate">{ticket.customer.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        {ticket.messages.length > 0 && (
                          <span>{ticket.messages.length}</span>
                        )}
                        {getStatusIcon(ticket.status)}
                      </div>
                    </div>

                    {/* SLA Warning - Only if critical */}
                    {ticket.sla?.status === 'breached' && (
                      <div className="flex items-center space-x-1 text-xs text-red-600 bg-red-50 dark:bg-red-950/20 px-2 py-1 rounded">
                        <AlertCircle className="h-3 w-3" />
                        <span>SLA Breached</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TicketList;