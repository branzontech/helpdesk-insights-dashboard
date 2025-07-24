import React, { useState } from 'react';
import { 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Tag, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  Send, 
  Paperclip, 
  MoreVertical,
  Edit,
  UserPlus,
  Star,
  MessageSquare,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { mockTicketDetail, TicketDetail, TicketMessage } from '@/lib/mockData';
import { formatDistanceToNow, format } from 'date-fns';

const TicketView = () => {
  const [ticket] = useState<TicketDetail>(mockTicketDetail);
  const [replyContent, setReplyContent] = useState('');
  const [replyType, setReplyType] = useState<'public' | 'private'>('public');
  const [showPrivateNotes, setShowPrivateNotes] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'secondary';
      case 'inProgress': return 'default';
      case 'closed': return 'outline';
      case 'pending': return 'destructive';
      default: return 'secondary';
    }
  };

  const getSLAStatus = (sla: any) => {
    switch (sla?.status) {
      case 'met': return { color: 'bg-green-500', text: 'SLA Met' };
      case 'warning': return { color: 'bg-yellow-500', text: 'SLA Warning' };
      case 'breached': return { color: 'bg-red-500', text: 'SLA Breached' };
      default: return { color: 'bg-gray-500', text: 'No SLA' };
    }
  };

  const filteredMessages = showPrivateNotes 
    ? ticket.messages 
    : ticket.messages.filter(msg => !msg.isPrivate);

  const handleSendReply = () => {
    // Here you would implement the actual send functionality
    console.log('Sending reply:', { content: replyContent, type: replyType });
    setReplyContent('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Ticket #{ticket.id}</h1>
            <Badge variant={getPriorityColor(ticket.priority)} className="capitalize">
              {ticket.priority} Priority
            </Badge>
            <Badge variant={getStatusColor(ticket.status)} className="capitalize">
              {ticket.status.replace(/([A-Z])/g, ' $1').trim()}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPrivateNotes(!showPrivateNotes)}
                  className={showPrivateNotes ? 'bg-muted' : ''}
                >
                  {showPrivateNotes ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {showPrivateNotes ? 'Hide private notes' : 'Show private notes'}
              </TooltipContent>
            </Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Ticket
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Assign Agent
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Star className="mr-2 h-4 w-4" />
                  Add to Favorites
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Conversation Area */}
          <div className="flex-1 flex flex-col">
            {/* Ticket Info Bar */}
            <div className="bg-muted/30 border-b p-4">
              <h2 className="text-lg font-semibold mb-2">{ticket.title}</h2>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Created {format(new Date(ticket.createdAt), 'MMM dd, yyyy HH:mm')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Updated {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}</span>
                </div>
                {ticket.sla && (
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getSLAStatus(ticket.sla).color}`} />
                    <span className="text-xs">{getSLAStatus(ticket.sla).text}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {ticket.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-6">
                {filteredMessages.map((message) => (
                  <MessageItem key={message.id} message={message} />
                ))}
              </div>
            </ScrollArea>

            {/* Reply Box */}
            <div className="border-t bg-background p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Select value={replyType} onValueChange={(value: 'public' | 'private') => setReplyType(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Public Reply
                          </div>
                        </SelectItem>
                        <SelectItem value="private">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-2" />
                            Private Note
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Textarea
                  placeholder={replyType === 'private' ? 'Add a private note...' : 'Type your reply...'}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    {replyType === 'private' ? 'This note will only be visible to agents' : 'This reply will be sent to the customer'}
                  </div>
                  <Button 
                    onClick={handleSendReply} 
                    disabled={!replyContent.trim()}
                    className="min-w-[100px]"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Sidebar */}
          <div className="w-80 border-l bg-muted/20">
            <div className="p-4">
              <h3 className="font-semibold mb-4 flex items-center">
                <User className="h-4 w-4 mr-2" />
                Customer Details
              </h3>
              
              {/* Customer Profile */}
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={ticket.customer.avatar} />
                      <AvatarFallback>{ticket.customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">{ticket.customer.name}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        {ticket.customer.satisfactionScore.toFixed(1)} rating
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="truncate">{ticket.customer.email}</span>
                    </div>
                    {ticket.customer.company && (
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="truncate">{ticket.customer.company}</span>
                      </div>
                    )}
                    {ticket.customer.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="truncate">{ticket.customer.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Total Tickets</div>
                      <div className="font-medium">{ticket.customer.totalTickets}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Timezone</div>
                      <div className="font-medium">{ticket.customer.timezone || 'Unknown'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ticket Properties */}
              <Card className="mb-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Ticket Properties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Category</label>
                    <div className="text-sm font-medium">{ticket.category}</div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Assigned Agent</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={ticket.assignedAgent?.avatar} />
                        <AvatarFallback className="text-xs">
                          {ticket.assignedAgent?.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{ticket.assignedAgent?.name}</span>
                    </div>
                  </div>
                  {ticket.dueDate && (
                    <div>
                      <label className="text-xs text-muted-foreground">Due Date</label>
                      <div className="text-sm font-medium">
                        {format(new Date(ticket.dueDate), 'MMM dd, yyyy HH:mm')}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Custom Fields */}
              {ticket.customFields && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Additional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(ticket.customFields).map(([key, value]) => (
                      <div key={key}>
                        <label className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <div className="text-sm font-medium">{String(value)}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageItem: React.FC<{ message: TicketMessage }> = ({ message }) => {
  const isAgent = message.author.type === 'agent';
  const isSystem = message.author.type === 'system';
  const isPrivate = message.isPrivate;

  return (
    <div className={`flex ${isAgent && !isSystem ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] ${isAgent && !isSystem ? 'order-2' : 'order-1'}`}>
        <div className="flex items-center space-x-2 mb-2">
          {!isSystem && (
            <Avatar className="h-6 w-6">
              <AvatarImage src={message.author.avatar} />
              <AvatarFallback className="text-xs">
                {message.author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          )}
          <span className="text-sm font-medium">{message.author.name}</span>
          <span className="text-xs text-muted-foreground">
            {format(new Date(message.timestamp), 'MMM dd, HH:mm')}
          </span>
          {isPrivate && (
            <Badge variant="secondary" className="text-xs">
              <Eye className="h-3 w-3 mr-1" />
              Private
            </Badge>
          )}
        </div>
        
        <div 
          className={`rounded-lg p-3 ${
            isSystem 
              ? 'bg-muted border-l-4 border-l-primary text-sm'
              : isAgent 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted'
          } ${isPrivate ? 'border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20' : ''}`}
        >
          <div className="whitespace-pre-wrap text-sm">{message.content}</div>
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-3 pt-3 border-t border-current/20">
              <div className="text-xs opacity-75 mb-2">Attachments:</div>
              {message.attachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center space-x-2 text-xs">
                  <Paperclip className="h-3 w-3" />
                  <span>{attachment.name}</span>
                  <span className="opacity-60">({attachment.size})</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketView;