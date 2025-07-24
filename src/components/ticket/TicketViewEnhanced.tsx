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
  X
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
    <div className="h-full bg-background flex flex-col">
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
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="px-6 py-3 border-b">
            <TabsList className="grid w-full max-w-md grid-cols-3 h-9">
              <TabsTrigger value="conversation" className="text-sm data-[state=active]:shadow-none">
                Conversation
                {filteredMessages.length > 0 && (
                  <span className="ml-1.5 text-xs text-muted-foreground">
                    {filteredMessages.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="details" className="text-sm data-[state=active]:shadow-none">
                Details
              </TabsTrigger>
              <TabsTrigger value="activity" className="text-sm data-[state=active]:shadow-none">
                Activity
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="conversation" className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col">
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

            <TabsContent value="details" className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col">
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

            <TabsContent value="activity" className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col">
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

// Enhanced Message Component
const MessageItemEnhanced: React.FC<{ message: TicketMessage }> = ({ message }) => {
  const isAgent = message.author.type === 'agent';
  const isSystem = message.author.type === 'system';
  const isPrivate = message.isPrivate;

  return (
    <div className={`flex ${isAgent && !isSystem ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] ${isAgent && !isSystem ? 'order-2' : 'order-1'}`}>
        <div className="flex items-center space-x-2 mb-2">
          {!isSystem && (
            <Avatar className="h-7 w-7">
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
          className={`rounded-lg p-4 transition-all hover:shadow-sm ${
            isSystem 
              ? 'bg-muted border-l-4 border-l-primary text-sm'
              : isAgent 
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
const ActivityTimeline: React.FC<{ ticket: TicketDetail }> = ({ ticket }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-sm flex items-center">
        <Activity className="h-4 w-4 mr-2" />
        Activity Timeline
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
          <div className="flex-1">
            <div className="text-sm font-medium">Ticket created</div>
            <div className="text-xs text-muted-foreground">
              {format(new Date(ticket.createdAt), 'MMM dd, yyyy HH:mm')}
            </div>
          </div>
        </div>
        
        {ticket.assignedAgent && (
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
            <div className="flex-1">
              <div className="text-sm font-medium">Assigned to {ticket.assignedAgent.name}</div>
              <div className="text-xs text-muted-foreground">
                {format(new Date(ticket.createdAt), 'MMM dd, yyyy HH:mm')}
              </div>
            </div>
          </div>
        )}
        
        <div className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
          <div className="flex-1">
            <div className="text-sm font-medium">Status updated to {ticket.status}</div>
            <div className="text-xs text-muted-foreground">
              {format(new Date(ticket.updatedAt), 'MMM dd, yyyy HH:mm')}
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default TicketViewEnhanced;