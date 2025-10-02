import React, { useState, useRef, useEffect } from 'react';
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
  EyeOff,
  Image,
  Download,
  Reply,
  Forward,
  Archive,
  Trash2,
  Flag,
  Timer,
  Activity,
  TrendingUp,
  FileText,
  Smile,
  Bold,
  Italic,
  List,
  Link,
  ChevronDown,
  X,
  Zap
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { TicketDetail, TicketMessage } from '@/lib/mockData';
import { formatDistanceToNow, format } from 'date-fns';
import { SmartFlowPanel } from './SmartFlowPanel';
import { SmartFlow } from '@/types/smartFlow';

interface TicketViewEnhancedProps {
  ticket: TicketDetail;
  onUpdateTicket: (updates: Partial<TicketDetail>) => void;
  onAddMessage: (content: string, isPrivate?: boolean) => void;
}

const TicketViewEnhanced: React.FC<TicketViewEnhancedProps> = ({ 
  ticket, 
  onUpdateTicket, 
  onAddMessage 
}) => {
  const [replyContent, setReplyContent] = useState('');
  const [replyType, setReplyType] = useState<'public' | 'private'>('public');
  const [showPrivateNotes, setShowPrivateNotes] = useState(false);
  const [activeTab, setActiveTab] = useState('conversation');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(ticket.title);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ticket.messages]);

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
      case 'met': return { color: 'bg-green-500', text: 'SLA Met', progress: 100 };
      case 'warning': return { color: 'bg-yellow-500', text: 'SLA Warning', progress: 75 };
      case 'breached': return { color: 'bg-red-500', text: 'SLA Breached', progress: 0 };
      default: return { color: 'bg-gray-500', text: 'No SLA', progress: 50 };
    }
  };

  const filteredMessages = showPrivateNotes 
    ? ticket.messages 
    : ticket.messages.filter(msg => !msg.isPrivate);

  const handleSendReply = () => {
    if (!replyContent.trim()) return;
    onAddMessage(replyContent, replyType === 'private');
    setReplyContent('');
  };

  const handleStatusChange = (newStatus: string) => {
    onUpdateTicket({ status: newStatus as any });
  };

  const handlePriorityChange = (newPriority: string) => {
    onUpdateTicket({ priority: newPriority as any });
  };

  const handleTitleSave = () => {
    onUpdateTicket({ title: editedTitle });
    setIsEditing(false);
  };

  const slaStatus = getSLAStatus(ticket.sla);

  return (
    <div className="h-full min-h-0 bg-background flex flex-col">
      {/* Minimalist Header */}
      <div className="border-b bg-background">
        <div className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center space-x-3 flex-1">
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="text-lg font-medium"
                  onKeyDown={(e) => e.key === 'Enter' && handleTitleSave()}
                  autoFocus
                />
                <Button size="sm" onClick={handleTitleSave}>Save</Button>
                <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-medium truncate max-w-md">{ticket.title}</h1>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsEditing(true)}
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            )}
            <div className="text-xs text-muted-foreground font-mono">#{ticket.id}</div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant={getPriorityColor(ticket.priority)} className="capitalize text-xs">
              {ticket.priority}
            </Badge>
            <Badge variant={getStatusColor(ticket.status)} className="capitalize text-xs">
              {ticket.status.replace(/([A-Z])/g, ' $1').trim()}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowPrivateNotes(!showPrivateNotes)}>
                  {showPrivateNotes ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                  {showPrivateNotes ? 'Hide private notes' : 'Show private notes'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Assign Agent
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Star className="mr-2 h-4 w-4" />
                  Add to Favorites
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="mr-2 h-4 w-4" />
                  Forward Ticket
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content with Minimalist Tabs */}
      <div className="flex-1 overflow-hidden min-h-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full min-h-0 flex flex-col">
          <div className="px-6 py-3 border-b">
            <TabsList className="grid w-full max-w-2xl grid-cols-4 h-9">
              <TabsTrigger value="conversation" className="text-sm data-[state=active]:shadow-none">
                Conversation
                {filteredMessages.length > 0 && (
                  <span className="ml-1.5 text-xs text-muted-foreground">
                    {filteredMessages.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="smartflow" className="text-sm data-[state=active]:shadow-none">
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                Smart Flows
              </TabsTrigger>
              <TabsTrigger value="details" className="text-sm data-[state=active]:shadow-none">
                Details
              </TabsTrigger>
              <TabsTrigger value="activity" className="text-sm data-[state=active]:shadow-none">
                Activity
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden min-h-0">
            <TabsContent value="conversation" className="h-full min-h-0 mt-0 data-[state=active]:flex data-[state=active]:flex-col">
              {/* Messages */}
              <ScrollArea className="flex-1 px-6">
                <div className="space-y-6 py-4">
                  {filteredMessages.map((message) => (
                    <MessageItemEnhanced key={message.id} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Minimalist Reply Box */}
              <div className="border-t bg-background p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Select value={replyType} onValueChange={(value: 'public' | 'private') => setReplyType(value)}>
                      <SelectTrigger className="w-36 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public Reply</SelectItem>
                        <SelectItem value="private">Private Note</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <Textarea
                    placeholder={replyType === 'private' ? 'Add a private note...' : 'Type your reply...'}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="min-h-[100px] resize-none border-0 focus-visible:ring-1 bg-muted/30"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                        handleSendReply();
                      }
                    }}
                  />
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      Ctrl+Enter to send
                    </div>
                    <Button 
                      onClick={handleSendReply} 
                      disabled={!replyContent.trim()}
                      size="sm"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="smartflow" className="h-full min-h-0 mt-0 data-[state=active]:flex data-[state=active]:flex-col">
              <div className="flex-1 overflow-hidden px-6 py-4">
                <SmartFlowPanel 
                  ticketId={ticket.id}
                  onApplyFlow={(flow: SmartFlow) => {
                    console.log('Aplicando Smart Flow:', flow, 'al ticket:', ticket.id);
                    // Aquí se implementaría la lógica para aplicar las acciones del flow
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent value="details" className="h-full min-h-0 mt-0 data-[state=active]:flex data-[state=active]:flex-col">
              <ScrollArea className="flex-1 px-6">
                <div className="py-4 space-y-6">
                  {/* Customer Details */}
                  <CustomerDetailsCard customer={ticket.customer} />
                  
                  {/* Ticket Properties */}
                  <TicketPropertiesCard ticket={ticket} onUpdate={onUpdateTicket} />
                  
                  {/* Custom Fields */}
                  {ticket.customFields && Object.keys(ticket.customFields).length > 0 && (
                    <CustomFieldsCard customFields={ticket.customFields} />
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="activity" className="h-full min-h-0 mt-0 data-[state=active]:flex data-[state=active]:flex-col">
              <ScrollArea className="flex-1 px-6">
                <div className="py-4">
                  <ActivityTimeline ticket={ticket} />
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

// Enhanced Message Component with Rating, Escalation, and Agent Assignment features
const MessageItemEnhanced: React.FC<{ message: TicketMessage }> = ({ message }) => {
  const isAgent = message.author.type === 'agent';
  const isSystem = message.author.type === 'system';
  const isPrivate = message.isPrivate;
  const metadata = message.metadata;

  // Render special system events based on metadata
  if (isSystem && metadata) {
    // Agent Assignment Event
    if (metadata.type === 'agent_assigned') {
      return (
        <div className="flex justify-center my-4">
          <div className="max-w-md w-full">
            <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                      <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Agente asignado
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={metadata.agentAvatar} />
                        <AvatarFallback className="text-xs">
                          {metadata.agentName?.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-blue-700 dark:text-blue-300">
                        {metadata.agentName}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-blue-600/70 dark:text-blue-400/70">
                    {format(new Date(message.timestamp), 'HH:mm')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    // Escalation Event
    if (metadata.type === 'escalated') {
      return (
        <div className="flex justify-center my-4">
          <div className="max-w-md w-full">
            <Card className="border-orange-200 bg-gradient-to-r from-orange-50/80 to-amber-50/80 dark:from-orange-950/20 dark:to-amber-950/20">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-1">
                      Ticket escalado
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-orange-800 dark:text-orange-200">
                        <span className="font-medium">Nivel:</span>
                        <span className="ml-2">{metadata.escalationLevel}</span>
                      </div>
                      {metadata.reason && (
                        <div className="text-xs text-orange-700/80 dark:text-orange-300/80 mt-1">
                          <span className="font-medium">Motivo:</span> {metadata.reason}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-orange-600/70 dark:text-orange-400/70">
                    {format(new Date(message.timestamp), 'HH:mm')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    // Rating Event
    if (metadata.type === 'rating' && metadata.rating) {
      const rating = metadata.rating;
      const isLowRating = rating <= 2;
      const isMediumRating = rating === 3;
      const isHighRating = rating >= 4;

      return (
        <div className="flex justify-center my-4">
          <div className="max-w-md w-full">
            <Card className={`${
              isLowRating 
                ? 'border-red-200 bg-gradient-to-br from-red-50/80 to-rose-50/80 dark:from-red-950/20 dark:to-rose-950/20'
                : isMediumRating
                ? 'border-yellow-200 bg-gradient-to-br from-yellow-50/80 to-amber-50/80 dark:from-yellow-950/20 dark:to-amber-950/20'
                : 'border-green-200 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/20 dark:to-emerald-950/20'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isLowRating 
                        ? 'bg-red-100 dark:bg-red-900/50'
                        : isMediumRating
                        ? 'bg-yellow-100 dark:bg-yellow-900/50'
                        : 'bg-green-100 dark:bg-green-900/50'
                    }`}>
                      <Star className={`h-5 w-5 ${
                        isLowRating 
                          ? 'text-red-600 dark:text-red-400 fill-red-600 dark:fill-red-400'
                          : isMediumRating
                          ? 'text-yellow-600 dark:text-yellow-400 fill-yellow-600 dark:fill-yellow-400'
                          : 'text-green-600 dark:text-green-400 fill-green-600 dark:fill-green-400'
                      }`} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold mb-2 ${
                      isLowRating 
                        ? 'text-red-900 dark:text-red-100'
                        : isMediumRating
                        ? 'text-yellow-900 dark:text-yellow-100'
                        : 'text-green-900 dark:text-green-100'
                    }`}>
                      Calificación del cliente
                    </p>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                      <span className="text-sm font-bold ml-2 text-foreground">
                        {rating}/5
                      </span>
                    </div>
                    {metadata.feedback && (
                      <div className={`mt-2 text-xs italic ${
                        isLowRating 
                          ? 'text-red-700 dark:text-red-300'
                          : isMediumRating
                          ? 'text-yellow-700 dark:text-yellow-300'
                          : 'text-green-700 dark:text-green-300'
                      }`}>
                        "{metadata.feedback}"
                      </div>
                    )}
                  </div>
                  <div className={`text-xs ${
                    isLowRating 
                      ? 'text-red-600/70 dark:text-red-400/70'
                      : isMediumRating
                      ? 'text-yellow-600/70 dark:text-yellow-400/70'
                      : 'text-green-600/70 dark:text-green-400/70'
                  }`}>
                    {format(new Date(message.timestamp), 'HH:mm')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }
  }

  // Regular message rendering
  return (
    <div className={`flex ${isAgent && !isSystem ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] ${isAgent && !isSystem ? 'order-2' : 'order-1'}`}>
        <div className="flex items-center space-x-2 mb-2">
          <Avatar className="h-7 w-7">
            <AvatarImage src={message.author.avatar} />
            <AvatarFallback className="text-xs">
              {message.author.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
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
          className={`rounded-lg p-4 transition-all hover:shadow-sm ${
            isAgent 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted border'
          } ${isPrivate ? 'border-2 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20' : ''}`}
        >
          <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-4 pt-3 border-t border-current/20">
              <div className="text-xs opacity-75 mb-2">Attachments:</div>
              <div className="space-y-2">
                {message.attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center space-x-3 p-2 bg-background/50 rounded text-xs">
                    {attachment.type.startsWith('image/') ? (
                      <Image className="h-4 w-4" />
                    ) : (
                      <FileText className="h-4 w-4" />
                    )}
                    <span className="flex-1">{attachment.name}</span>
                    <span className="opacity-60">({attachment.size})</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Customer Details Card Component
const CustomerDetailsCard: React.FC<{ customer: any }> = ({ customer }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-sm flex items-center">
        <User className="h-4 w-4 mr-2" />
        Customer Information
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={customer.avatar} />
          <AvatarFallback>{customer.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h4 className="font-medium">{customer.name}</h4>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="h-3 w-3 mr-1" />
            {customer.satisfactionScore?.toFixed(1) || 'N/A'} rating
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center space-x-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{customer.email}</span>
        </div>
        {customer.company && (
          <div className="flex items-center space-x-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{customer.company}</span>
          </div>
        )}
        {customer.location && (
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{customer.location}</span>
          </div>
        )}
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-muted-foreground">Total Tickets</div>
          <div className="font-medium">{customer.totalTickets}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Timezone</div>
          <div className="font-medium">{customer.timezone || 'Unknown'}</div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Ticket Properties Card Component
const TicketPropertiesCard: React.FC<{ ticket: TicketDetail; onUpdate: (updates: any) => void }> = ({ 
  ticket, 
  onUpdate 
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-sm">Ticket Properties</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground">Category</label>
          <div className="text-sm font-medium">{ticket.category}</div>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Priority</label>
          <div className="text-sm font-medium capitalize">{ticket.priority}</div>
        </div>
      </div>
      
      <div>
        <label className="text-xs text-muted-foreground">Assigned Agent</label>
        <div className="flex items-center space-x-2 mt-1">
          {ticket.assignedAgent ? (
            <>
              <Avatar className="h-6 w-6">
                <AvatarImage src={ticket.assignedAgent.avatar} />
                <AvatarFallback className="text-xs">
                  {ticket.assignedAgent.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{ticket.assignedAgent.name}</span>
            </>
          ) : (
            <span className="text-sm text-muted-foreground">Unassigned</span>
          )}
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
);

// Custom Fields Card Component
const CustomFieldsCard: React.FC<{ customFields: Record<string, any> }> = ({ customFields }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-sm">Additional Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {Object.entries(customFields).map(([key, value]) => (
        <div key={key}>
          <label className="text-xs text-muted-foreground capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          <div className="text-sm font-medium">{String(value)}</div>
        </div>
      ))}
    </CardContent>
  </Card>
);

// Activity Timeline Component
interface ActivityEvent {
  type: string;
  title: string;
  timestamp: string;
  color: string;
  icon: any;
  details?: string;
}

const ActivityTimeline: React.FC<{ ticket: TicketDetail }> = ({ ticket }) => {
  // Extract activity events from messages
  const getActivityEvents = (): ActivityEvent[] => {
    const events: ActivityEvent[] = [
      {
        type: 'created',
        title: 'Ticket created',
        timestamp: ticket.createdAt,
        color: 'bg-green-500',
        icon: CheckCircle
      }
    ];

    if (ticket.assignedAgent) {
      events.push({
        type: 'assigned',
        title: `Assigned to ${ticket.assignedAgent.name}`,
        timestamp: ticket.createdAt,
        color: 'bg-blue-500',
        icon: UserPlus
      });
    }

    // Add events from messages
    ticket.messages.forEach(message => {
      if (message.content.includes('calificación') || message.content.includes('rating')) {
        const ratingMatch = message.content.match(/(\d+)\s*(estrella|star)/i);
        const rating = ratingMatch ? parseInt(ratingMatch[1]) : null;
        
        events.push({
          type: 'rated',
          title: rating ? `Ticket calificado con ${rating} estrellas` : 'Ticket calificado',
          timestamp: message.timestamp,
          color: rating && rating < 3 ? 'bg-red-500' : 'bg-yellow-500',
          icon: Star,
          details: rating && rating < 3 ? 'Calificación baja - Requiere atención' : undefined
        });
      }

      if (message.content.includes('escalado') || message.content.includes('escalated')) {
        events.push({
          type: 'escalated',
          title: 'Ticket escalado',
          timestamp: message.timestamp,
          color: 'bg-orange-500',
          icon: TrendingUp,
          details: 'Ticket escalado a nivel superior'
        });
      }

      if (message.content.includes('rechazado') || message.content.includes('rejected')) {
        events.push({
          type: 'rejected',
          title: 'Ticket rechazado',
          timestamp: message.timestamp,
          color: 'bg-red-500',
          icon: X,
          details: 'Ticket rechazado por el agente'
        });
      }
    });

    events.push({
      type: 'status_updated',
      title: `Status updated to ${ticket.status}`,
      timestamp: ticket.updatedAt,
      color: 'bg-gray-500',
      icon: Activity
    });

    // Sort events by timestamp
    return events.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  const activityEvents = getActivityEvents();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center">
          <Activity className="h-4 w-4 mr-2" />
          Activity Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activityEvents.map((event, index) => {
            const IconComponent = event.icon;
            return (
              <div key={`${event.type}-${index}`} className="flex items-start space-x-3">
                <div className={`w-2 h-2 ${event.color} rounded-full mt-2`} />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-3 w-3 text-muted-foreground" />
                    <div className="text-sm font-medium">{event.title}</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {format(new Date(event.timestamp), 'MMM dd, yyyy HH:mm')}
                  </div>
                  {event.details && (
                    <div className={`text-xs mt-1 p-2 rounded ${
                      event.type === 'rated' && event.color === 'bg-red-500' 
                        ? 'bg-red-50 text-red-700 border border-red-200' 
                        : event.type === 'escalated'
                        ? 'bg-orange-50 text-orange-700 border border-orange-200'
                        : event.type === 'rejected'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {event.details}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketViewEnhanced;