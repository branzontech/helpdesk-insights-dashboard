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

// Campos específicos por categoría
const categoryFields: Record<string, Array<{
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder: string;
  options?: string[];
  required?: boolean;
}>> = {
  "Email & Communication": [
    { id: "email_service", label: "Email Service Provider", type: "select", placeholder: "Select provider", options: ["Gmail", "Outlook", "Exchange", "Apple Mail", "Other"], required: true },
    { id: "email_client", label: "Email Client", type: "select", placeholder: "Select client", options: ["Web Browser", "Desktop App", "Mobile App", "Thunderbird", "Other"] },
    { id: "error_message", label: "Error Message", type: "textarea", placeholder: "Copy and paste the exact error message..." },
    { id: "sender_email", label: "Sender Email", type: "email", placeholder: "sender@example.com" },
    { id: "recipient_email", label: "Recipient Email", type: "email", placeholder: "recipient@example.com" },
    { id: "email_size", label: "Email Size (MB)", type: "text", placeholder: "e.g., 25MB" },
    { id: "attachments", label: "Attachments", type: "select", placeholder: "Select option", options: ["Yes, with attachments", "No attachments", "Only attachments failing"] },
    { id: "frequency", label: "Issue Frequency", type: "select", placeholder: "Select frequency", options: ["Always", "Sometimes", "First time", "Intermittent"] },
    { id: "last_working", label: "Last Working Date", type: "text", placeholder: "When did it last work? e.g., Yesterday" },
    { id: "additional_info", label: "Additional Information", type: "textarea", placeholder: "Any other relevant details..." }
  ],
  "Software Installation": [
    { id: "software_name", label: "Software Name", type: "text", placeholder: "Name of the software", required: true },
    { id: "software_version", label: "Version", type: "text", placeholder: "e.g., 2024.1.0" },
    { id: "operating_system", label: "Operating System", type: "select", placeholder: "Select OS", options: ["Windows 11", "Windows 10", "macOS", "Linux", "Other"], required: true },
    { id: "installation_source", label: "Installation Source", type: "select", placeholder: "Select source", options: ["Company Store", "Official Website", "CD/DVD", "USB Drive", "Network Drive"] },
    { id: "error_code", label: "Error Code", type: "text", placeholder: "e.g., Error 1603" },
    { id: "installation_step", label: "Installation Step", type: "textarea", placeholder: "At what step does the installation fail?" },
    { id: "previous_versions", label: "Previous Versions", type: "select", placeholder: "Select option", options: ["First installation", "Upgrade from older version", "Reinstalling same version"] },
    { id: "admin_rights", label: "Administrator Rights", type: "select", placeholder: "Select option", options: ["Yes, I have admin rights", "No, limited user", "Not sure"] },
    { id: "antivirus_software", label: "Antivirus Software", type: "text", placeholder: "Name of antivirus (if any)" },
    { id: "disk_space", label: "Available Disk Space", type: "text", placeholder: "e.g., 500GB available" }
  ],
  "Hardware": [
    { id: "device_type", label: "Device Type", type: "select", placeholder: "Select device", options: ["Desktop Computer", "Laptop", "Printer", "Scanner", "Monitor", "Keyboard", "Mouse", "Other"], required: true },
    { id: "device_model", label: "Device Model", type: "text", placeholder: "e.g., Dell OptiPlex 7090", required: true },
    { id: "serial_number", label: "Serial Number", type: "text", placeholder: "Device serial number" },
    { id: "purchase_date", label: "Purchase Date", type: "text", placeholder: "Approximate purchase date" },
    { id: "warranty_status", label: "Warranty Status", type: "select", placeholder: "Select status", options: ["Under warranty", "Warranty expired", "Not sure"] },
    { id: "symptoms", label: "Symptoms", type: "textarea", placeholder: "Describe what the device is doing or not doing..." },
    { id: "when_started", label: "When Started", type: "text", placeholder: "When did the problem start?" },
    { id: "physical_damage", label: "Physical Damage", type: "select", placeholder: "Select option", options: ["No visible damage", "Minor damage", "Significant damage", "Liquid spill"] },
    { id: "connectivity", label: "Connectivity", type: "select", placeholder: "Select connection", options: ["USB", "Wireless", "Bluetooth", "Network Cable", "Power Only", "Other"] },
    { id: "error_lights", label: "Error Lights/Sounds", type: "textarea", placeholder: "Any blinking lights, beeps, or error indicators?" }
  ],
  "Network & Security": [
    { id: "network_type", label: "Network Type", type: "select", placeholder: "Select type", options: ["WiFi", "Ethernet", "VPN", "Mobile Hotspot", "Other"], required: true },
    { id: "internet_speed", label: "Internet Speed", type: "text", placeholder: "e.g., 100 Mbps down / 20 Mbps up" },
    { id: "affected_devices", label: "Affected Devices", type: "select", placeholder: "Select option", options: ["Single device", "Multiple devices", "All devices", "Specific brand/type"] },
    { id: "connection_error", label: "Connection Error", type: "textarea", placeholder: "Exact error message or description" },
    { id: "security_software", label: "Security Software", type: "text", placeholder: "Firewall, antivirus, etc." },
    { id: "vpn_details", label: "VPN Details", type: "text", placeholder: "VPN service name (if applicable)" },
    { id: "network_changes", label: "Recent Changes", type: "textarea", placeholder: "Any recent network changes or updates?" },
    { id: "ip_configuration", label: "IP Configuration", type: "select", placeholder: "Select option", options: ["Automatic (DHCP)", "Static IP", "Not sure"] },
    { id: "dns_settings", label: "DNS Settings", type: "text", placeholder: "Custom DNS servers (if any)" },
    { id: "ports_protocols", label: "Specific Ports/Protocols", type: "text", placeholder: "If applicable (e.g., port 443, HTTPS)" }
  ],
  "Account Access": [
    { id: "account_type", label: "Account Type", type: "select", placeholder: "Select type", options: ["Company Email", "Software License", "Cloud Service", "Network Login", "Database", "Other"], required: true },
    { id: "username", label: "Username/Email", type: "text", placeholder: "Account username or email" },
    { id: "last_successful", label: "Last Successful Login", type: "text", placeholder: "When did you last access successfully?" },
    { id: "error_message_access", label: "Error Message", type: "textarea", placeholder: "Copy the exact error message" },
    { id: "password_changed", label: "Password Recently Changed", type: "select", placeholder: "Select option", options: ["Yes, by me", "Yes, by admin", "No, same password", "I don't remember"] },
    { id: "mfa_enabled", label: "Multi-Factor Authentication", type: "select", placeholder: "Select option", options: ["Yes, enabled", "No MFA", "Not sure"] },
    { id: "access_location", label: "Access Location", type: "select", placeholder: "Select location", options: ["Office network", "Home", "Public WiFi", "Mobile network", "Other"] },
    { id: "browser_device", label: "Browser/Device", type: "text", placeholder: "e.g., Chrome on Windows, Safari on iPhone" },
    { id: "account_locked", label: "Account Status", type: "select", placeholder: "Select status", options: ["Account works normally", "Account is locked", "Account is disabled", "Not sure"] },
    { id: "urgency_reason", label: "Urgency Reason", type: "textarea", placeholder: "Why do you need access urgently?" }
  ],
  "General Support": [
    { id: "issue_category", label: "Issue Category", type: "select", placeholder: "Select category", options: ["Performance", "User Training", "Feature Request", "Bug Report", "Documentation", "Other"], required: true },
    { id: "affected_application", label: "Affected Application", type: "text", placeholder: "Which application or system?" },
    { id: "user_level", label: "User Experience Level", type: "select", placeholder: "Select level", options: ["Beginner", "Intermediate", "Advanced", "Expert"] },
    { id: "preferred_contact", label: "Preferred Contact Method", type: "select", placeholder: "Select method", options: ["Email", "Phone", "Video Call", "In-person", "Chat"] },
    { id: "business_impact", label: "Business Impact", type: "select", placeholder: "Select impact", options: ["No impact", "Low impact", "Medium impact", "High impact", "Critical"] },
    { id: "workaround_tried", label: "Workarounds Tried", type: "textarea", placeholder: "What solutions have you already attempted?" },
    { id: "expected_outcome", label: "Expected Outcome", type: "textarea", placeholder: "What result are you hoping to achieve?" },
    { id: "deadline", label: "Deadline", type: "text", placeholder: "Do you have a specific deadline?" },
    { id: "additional_users", label: "Other Affected Users", type: "text", placeholder: "Names or emails of others affected" },
    { id: "supporting_documents", label: "Supporting Documents", type: "textarea", placeholder: "List any screenshots, files, or documents you can provide" }
  ]
};

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
    setCustomerSearch('');
    setNewTag('');
    setShowCustomerSearch(false);
    setShowNewCustomerForm(false);
    setNewCustomer({ name: '', email: '', company: '' });
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
      
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
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

          {/* Dynamic Category Fields */}
          {formData.category && categoryFields[formData.category] && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Separator className="flex-1" />
                <span className="text-sm font-medium text-muted-foreground">
                  {formData.category} Details
                </span>
                <Separator className="flex-1" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                {categoryFields[formData.category].map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id} className="text-sm">
                      {field.label}
                      {field.required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    
                    {field.type === 'select' ? (
                      <Select
                        value={formData.customFields[field.id] || ''}
                        onValueChange={(value) => 
                          setFormData(prev => ({
                            ...prev,
                            customFields: { ...prev.customFields, [field.id]: value }
                          }))
                        }
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === 'textarea' ? (
                      <Textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        value={formData.customFields[field.id] || ''}
                        onChange={(e) =>
                          setFormData(prev => ({
                            ...prev,
                            customFields: { ...prev.customFields, [field.id]: e.target.value }
                          }))
                        }
                        className="min-h-[80px] text-sm"
                      />
                    ) : (
                      <Input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData.customFields[field.id] || ''}
                        onChange={(e) =>
                          setFormData(prev => ({
                            ...prev,
                            customFields: { ...prev.customFields, [field.id]: e.target.value }
                          }))
                        }
                        className="h-9 text-sm"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

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