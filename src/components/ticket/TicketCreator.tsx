import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Search, 
  User, 
  Mail, 
  Building, 
  Tag, 
  Paperclip, 
  X,
  UserPlus,
  AlertCircle,
  Clock,
  Flag
} from 'lucide-react';
import { TicketDetail, Customer } from '@/lib/mockData';

interface TicketCreatorProps {
  onCreateTicket: (ticket: Partial<TicketDetail>) => void;
  children?: React.ReactNode;
}

// Mock customers for search
const mockCustomers: Customer[] = [
  {
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
  {
    id: "CUST-002",
    name: "Michael Chen",
    email: "m.chen@finance.company.com", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    company: "Financial Partners LLC",
    location: "San Francisco, USA",
    timezone: "PST",
    totalTickets: 8,
    satisfactionScore: 4.2
  },
  {
    id: "CUST-003",
    name: "Emma Rodriguez",
    email: "e.rodriguez@hr.company.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    company: "Global Enterprises",
    location: "Chicago, USA",
    timezone: "CST", 
    totalTickets: 15,
    satisfactionScore: 4.8
  }
];

const categories = [
  "Email & Communication",
  "Software Installation", 
  "Hardware",
  "Network & Security",
  "Account Access",
  "General Support"
];

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
  { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800' }
];

const TicketCreator: React.FC<TicketCreatorProps> = ({ onCreateTicket, children }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: '',
    tags: [] as string[],
    customer: null as Customer | null,
    customFields: {} as Record<string, string>
  });
  
  const [customerSearch, setCustomerSearch] = useState('');
  const [showCustomerSearch, setShowCustomerSearch] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    company: ''
  });

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    customer.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
    customer.company?.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.customer) {
      return;
    }

    const ticketData: Partial<TicketDetail> = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority as any,
      category: formData.category,
      tags: formData.tags,
      customer: formData.customer,
      customFields: formData.customFields
    };

    onCreateTicket(ticketData);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      category: '',
      tags: [],
      customer: null,
      customFields: {}
    });
    setOpen(false);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const createNewCustomer = () => {
    if (!newCustomer.name.trim() || !newCustomer.email.trim()) return;
    
    const customer: Customer = {
      id: `CUST-${Date.now()}`,
      name: newCustomer.name,
      email: newCustomer.email,
      company: newCustomer.company,
      totalTickets: 0,
      satisfactionScore: 0
    };
    
    setFormData(prev => ({ ...prev, customer }));
    setShowNewCustomerForm(false);
    setShowCustomerSearch(false);
    setNewCustomer({ name: '', email: '', company: '' });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Ticket</span>
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Create New Support Ticket</span>
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new support ticket
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Selection */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Customer *</span>
            </Label>
            
            {!formData.customer ? (
              <div className="space-y-3">
                {!showCustomerSearch ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCustomerSearch(true)}
                    className="w-full justify-start"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Select or search customer...
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Search customers by name, email, or company..."
                        value={customerSearch}
                        onChange={(e) => setCustomerSearch(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowNewCustomerForm(true)}
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {customerSearch && (
                      <Card className="max-h-48 overflow-y-auto">
                        <CardContent className="p-0">
                          {filteredCustomers.length > 0 ? (
                            filteredCustomers.map((customer) => (
                              <div
                                key={customer.id}
                                className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, customer }));
                                  setShowCustomerSearch(false);
                                  setCustomerSearch('');
                                }}
                              >
                                <div className="flex items-center space-x-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={customer.avatar} />
                                    <AvatarFallback>
                                      {customer.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="font-medium">{customer.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                      {customer.email}
                                    </div>
                                    {customer.company && (
                                      <div className="text-xs text-muted-foreground">
                                        {customer.company}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-4 text-center text-muted-foreground">
                              No customers found
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
                
                {showNewCustomerForm && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">New Customer</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Input
                        placeholder="Customer name *"
                        value={newCustomer.name}
                        onChange={(e) => setNewCustomer(prev => ({ ...prev, name: e.target.value }))}
                      />
                      <Input
                        placeholder="Email address *"
                        type="email"
                        value={newCustomer.email}
                        onChange={(e) => setNewCustomer(prev => ({ ...prev, email: e.target.value }))}
                      />
                      <Input
                        placeholder="Company (optional)"
                        value={newCustomer.company}
                        onChange={(e) => setNewCustomer(prev => ({ ...prev, company: e.target.value }))}
                      />
                      <div className="flex space-x-2">
                        <Button type="button" onClick={createNewCustomer} size="sm">
                          Create Customer
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setShowNewCustomerForm(false)}
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={formData.customer.avatar} />
                        <AvatarFallback>
                          {formData.customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{formData.customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {formData.customer.email}
                        </div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, customer: null }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Brief description of the issue..."
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          {/* Priority and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <Flag className="h-4 w-4" />
                <span>Priority</span>
              </Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${option.color}`} />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Detailed description of the issue..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="min-h-[100px]"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <Tag className="h-4 w-4" />
              <span>Tags</span>
            </Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                  <span>{tag}</span>
                  <button type="button" onClick={() => removeTag(tag)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Add tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1"
              />
              <Button type="button" onClick={addTag} variant="outline" size="sm">
                Add
              </Button>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!formData.title.trim() || !formData.customer}
              className="min-w-[120px]"
            >
              Create Ticket
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TicketCreator;