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
  Tag as TagIcon
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
    case 'open': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/20';
    case 'inProgress': return 'border-l-orange-500 bg-orange-50 dark:bg-orange-950/20';
    case 'pending': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
    case 'closed': return 'border-l-green-500 bg-green-50 dark:bg-green-950/20';
    default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-950/20';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-950/20 dark:text-red-300';
    case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-950/20 dark:text-orange-300';
    case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-300';
    case 'low': return 'bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-950/20 dark:text-gray-300';
  }
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
  onPriorityFilterChange
}) => {
  const [sortBy, setSortBy] = useState<'created' | 'updated' | 'priority'>('updated');

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

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Support Tickets</h2>
          <Button variant="outline" size="sm">
            <SortDesc className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets, customers, or IDs..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex space-x-2">
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                  <span>Open ({statusCounts.open || 0})</span>
                </div>
              </SelectItem>
              <SelectItem value="inProgress">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span>In Progress ({statusCounts.inProgress || 0})</span>
                </div>
              </SelectItem>
              <SelectItem value="pending">
                <div className="flex items-center space-x-2">
                  <Pause className="h-4 w-4 text-yellow-500" />
                  <span>Pending ({statusCounts.pending || 0})</span>
                </div>
              </SelectItem>
              <SelectItem value="closed">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Closed ({statusCounts.closed || 0})</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated">Updated</SelectItem>
              <SelectItem value="created">Created</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Stats */}
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <span>{tickets.length} tickets</span>
          <span>•</span>
          <span>{statusCounts.open || 0} open</span>
          <span>•</span>
          <span>{statusCounts.inProgress || 0} in progress</span>
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
                className={`cursor-pointer transition-all duration-200 hover:shadow-md border-l-4 ${
                  selectedTicketId === ticket.id 
                    ? 'ring-2 ring-primary ring-offset-2' 
                    : ''
                } ${getStatusColor(ticket.status)}`}
                onClick={() => onTicketSelect(ticket.id)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(ticket.status)}
                        <span className="text-xs font-mono text-muted-foreground">
                          {ticket.id}
                        </span>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getPriorityColor(ticket.priority)}`}
                        >
                          {ticket.priority}
                        </Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Assign Agent</DropdownMenuItem>
                          <DropdownMenuItem>Change Priority</DropdownMenuItem>
                          <DropdownMenuItem>Add to Favorites</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Title */}
                    <h3 className="font-medium text-sm leading-tight line-clamp-2">
                      {ticket.title}
                    </h3>

                    {/* Customer Info */}
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={ticket.customer.avatar} />
                        <AvatarFallback className="text-xs">
                          {ticket.customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium truncate">
                          {ticket.customer.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {ticket.customer.email}
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    {ticket.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {ticket.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                            <TagIcon className="h-2 w-2 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                        {ticket.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs px-1 py-0">
                            +{ticket.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}</span>
                      </div>
                      
                      {ticket.assignedAgent && (
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{ticket.assignedAgent.name}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-1">
                        <span>{ticket.messages.length}</span>
                        <span>replies</span>
                      </div>
                    </div>

                    {/* SLA Warning */}
                    {ticket.sla?.status === 'warning' && (
                      <div className="flex items-center space-x-1 text-xs text-orange-600 bg-orange-50 dark:bg-orange-950/20 px-2 py-1 rounded">
                        <AlertCircle className="h-3 w-3" />
                        <span>SLA Warning</span>
                      </div>
                    )}
                    
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