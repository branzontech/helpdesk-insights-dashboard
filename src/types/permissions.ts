export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  resource: string;
  action: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  permissions: string[];
  isSystem: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  roleId: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin?: Date;
}

export interface PermissionCategory {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}