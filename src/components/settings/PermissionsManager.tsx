import React, { useState } from 'react';
import { Users, Shield, Settings, Eye, Crown, UserCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mockRoles, mockUsers, permissionCategories } from '@/lib/permissionsData';
import type { Role, User } from '@/types/permissions';

const getRoleIcon = (roleId: string) => {
  switch (roleId) {
    case 'super_admin': return Crown;
    case 'admin': return Shield;
    case 'supervisor': return UserCheck;
    case 'agent': return Users;
    case 'viewer': return Eye;
    default: return Users;
  }
};

const getStatusBadge = (status: User['status']) => {
  const variants = {
    active: 'default',
    inactive: 'secondary',
    pending: 'outline'
  } as const;
  
  const labels = {
    active: 'Activo',
    inactive: 'Inactivo',
    pending: 'Pendiente'
  };
  
  return <Badge variant={variants[status]}>{labels[status]}</Badge>;
};

export const PermissionsManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const updateUserRole = (userId: string, newRoleId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, roleId: newRoleId } : user
    ));
  };

  const toggleRolePermission = (roleId: string, permissionId: string) => {
    setRoles(prev => prev.map(role => {
      if (role.id === roleId && !role.isSystem) {
        const hasPermission = role.permissions.includes(permissionId);
        return {
          ...role,
          permissions: hasPermission 
            ? role.permissions.filter(p => p !== permissionId)
            : [...role.permissions, permissionId]
        };
      }
      return role;
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Shield className="h-4 w-4 mr-2" />
          Gestionar Permisos
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Gestión de Permisos y Roles
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="permissions">Permisos</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Usuarios del Sistema</CardTitle>
                <CardDescription>
                  Gestiona los roles asignados a cada usuario
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Rol Actual</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Último Acceso</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => {
                        const userRole = roles.find(r => r.id === user.roleId);
                        const RoleIcon = getRoleIcon(user.roleId);
                        
                        return (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-xs">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <RoleIcon className="h-4 w-4" style={{ color: userRole?.color }} />
                                <span className="font-medium">{userRole?.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(user.status)}
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-muted-foreground">
                                {user.lastLogin 
                                  ? user.lastLogin.toLocaleDateString('es-ES')
                                  : 'Nunca'
                                }
                              </span>
                            </TableCell>
                            <TableCell>
                              <Select
                                value={user.roleId}
                                onValueChange={(value) => updateUserRole(user.id, value)}
                              >
                                <SelectTrigger className="w-40">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {roles.map((role) => {
                                    const Icon = getRoleIcon(role.id);
                                    return (
                                      <SelectItem key={role.id} value={role.id}>
                                        <div className="flex items-center gap-2">
                                          <Icon className="h-4 w-4" style={{ color: role.color }} />
                                          <span>{role.name}</span>
                                        </div>
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Roles Disponibles</CardTitle>
                  <CardDescription>
                    Selecciona un rol para ver y editar sus permisos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {roles.map((role) => {
                        const Icon = getRoleIcon(role.id);
                        const isSelected = selectedRole?.id === role.id;
                        
                        return (
                          <div
                            key={role.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted/50 ${
                              isSelected ? 'border-primary bg-primary/5' : ''
                            }`}
                            onClick={() => setSelectedRole(role)}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <Icon className="h-5 w-5" style={{ color: role.color }} />
                              <h3 className="font-semibold">{role.name}</h3>
                              {role.isSystem && (
                                <Badge variant="secondary" className="text-xs">Sistema</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {role.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline">
                                {role.permissions.length} permisos
                              </Badge>
                              <span 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: role.color }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {selectedRole && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {React.createElement(getRoleIcon(selectedRole.id), {
                        className: "h-5 w-5",
                        style: { color: selectedRole.color }
                      })}
                      Permisos de {selectedRole.name}
                    </CardTitle>
                    <CardDescription>
                      {selectedRole.isSystem 
                        ? 'Este es un rol del sistema y no se puede modificar'
                        : 'Marca o desmarca permisos para este rol'
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-96">
                      <div className="space-y-4">
                        {permissionCategories.map((category) => (
                          <div key={category.id} className="space-y-2">
                            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                              {category.name}
                            </h4>
                            <div className="space-y-2 pl-2">
                              {category.permissions.map((permission) => (
                                <div key={permission.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={permission.id}
                                    checked={selectedRole.permissions.includes(permission.id)}
                                    onCheckedChange={() => toggleRolePermission(selectedRole.id, permission.id)}
                                    disabled={selectedRole.isSystem}
                                  />
                                  <label 
                                    htmlFor={permission.id}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                  >
                                    {permission.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Matriz de Permisos</CardTitle>
                <CardDescription>
                  Vista general de todos los permisos organizados por categorías
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-6">
                    {permissionCategories.map((category) => (
                      <div key={category.id} className="space-y-3">
                        <div className="flex items-center gap-2 pb-2 border-b">
                          <Settings className="h-4 w-4 text-primary" />
                          <h3 className="font-semibold">{category.name}</h3>
                          <Badge variant="outline">{category.permissions.length}</Badge>
                        </div>
                        <div className="grid gap-3 pl-4">
                          {category.permissions.map((permission) => (
                            <div key={permission.id} className="space-y-1">
                              <h4 className="font-medium text-sm">{permission.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                {permission.description}
                              </p>
                              <div className="flex gap-1">
                                <Badge variant="secondary" className="text-xs">
                                  {permission.resource}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {permission.action}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};