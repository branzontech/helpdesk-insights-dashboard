import { useState } from 'react';
import { 
  ArrowLeft, Plus, Trash2, GripVertical, 
  CheckCircle, MessageCircle, ArrowUpCircle, Users, 
  CreditCard, AlertTriangle, Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SmartFlow, SmartFlowAction } from '@/types/smartFlow';
import { Badge } from '@/components/ui/badge';

const iconOptions = [
  { value: 'CheckCircle', label: 'Check Circle', icon: CheckCircle },
  { value: 'MessageCircle', label: 'Message Circle', icon: MessageCircle },
  { value: 'ArrowUpCircle', label: 'Arrow Up', icon: ArrowUpCircle },
  { value: 'Users', label: 'Users', icon: Users },
  { value: 'CreditCard', label: 'Credit Card', icon: CreditCard },
  { value: 'AlertTriangle', label: 'Alert', icon: AlertTriangle },
];

const colorOptions = [
  { value: 'green', label: 'Verde', class: 'bg-green-500' },
  { value: 'blue', label: 'Azul', class: 'bg-blue-500' },
  { value: 'orange', label: 'Naranja', class: 'bg-orange-500' },
  { value: 'purple', label: 'Morado', class: 'bg-purple-500' },
  { value: 'cyan', label: 'Cyan', class: 'bg-cyan-500' },
  { value: 'red', label: 'Rojo', class: 'bg-red-500' },
];

const categoryOptions = [
  { value: 'quick-resolve', label: 'Resolución Rápida' },
  { value: 'escalation', label: 'Escalamiento' },
  { value: 'assignment', label: 'Asignación' },
  { value: 'communication', label: 'Comunicación' },
  { value: 'custom', label: 'Personalizado' },
];

const actionTypeOptions = [
  { value: 'status', label: 'Cambiar Estado' },
  { value: 'priority', label: 'Cambiar Prioridad' },
  { value: 'assign', label: 'Asignar' },
  { value: 'reply', label: 'Responder' },
  { value: 'tag', label: 'Agregar Etiqueta' },
  { value: 'escalate', label: 'Escalar' },
  { value: 'close', label: 'Cerrar' },
];

interface SmartFlowEditorProps {
  flow: SmartFlow | null;
  onSave: (flow: SmartFlow) => void;
  onCancel: () => void;
}

export function SmartFlowEditor({ flow, onSave, onCancel }: SmartFlowEditorProps) {
  const [formData, setFormData] = useState<Partial<SmartFlow>>(
    flow || {
      id: `sf-${Date.now()}`,
      name: '',
      description: '',
      category: 'custom',
      icon: 'CheckCircle',
      color: 'blue',
      actions: [],
      usageCount: 0,
    }
  );

  const handleAddAction = () => {
    const newAction: SmartFlowAction = {
      id: `a${(formData.actions?.length || 0) + 1}`,
      type: 'status',
      label: 'Nueva Acción',
      value: '',
    };
    setFormData({
      ...formData,
      actions: [...(formData.actions || []), newAction],
    });
  };

  const handleRemoveAction = (actionId: string) => {
    setFormData({
      ...formData,
      actions: formData.actions?.filter(a => a.id !== actionId),
    });
  };

  const handleUpdateAction = (actionId: string, updates: Partial<SmartFlowAction>) => {
    setFormData({
      ...formData,
      actions: formData.actions?.map(a => 
        a.id === actionId ? { ...a, ...updates } : a
      ),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.actions && formData.actions.length > 0) {
      onSave(formData as SmartFlow);
    }
  };

  const SelectedIcon = iconOptions.find(opt => opt.value === formData.icon)?.icon || CheckCircle;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onCancel} size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <div>
          <h2 className="text-xl font-bold">
            {flow ? 'Editar Flow' : 'Crear Nuevo Flow'}
          </h2>
          <p className="text-sm text-muted-foreground">
            Configura las acciones que se ejecutarán automáticamente
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1">
          <div className="space-y-6 pr-4">
            {/* Basic Info */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Información Básica</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre del Flow *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej: Resolver y Cerrar"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Categoría</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe brevemente qué hace este flow"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="icon">Icono</Label>
                    <Select
                      value={formData.icon}
                      onValueChange={(value) => setFormData({ ...formData, icon: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>
                            <div className="flex items-center gap-2">
                              <opt.icon className="h-4 w-4" />
                              {opt.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Select
                      value={formData.color}
                      onValueChange={(value) => setFormData({ ...formData, color: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded ${opt.class}`} />
                              {opt.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <Label>Vista Previa</Label>
                  <div className={`mt-2 p-4 rounded-lg border bg-${formData.color}-500/10 border-${formData.color}-500/20`}>
                    <div className="flex items-center gap-3">
                      <SelectedIcon className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{formData.name || 'Nombre del Flow'}</div>
                        <div className="text-sm opacity-80">{formData.description || 'Descripción'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Acciones</h3>
                <Button type="button" onClick={handleAddAction} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Acción
                </Button>
              </div>

              {formData.actions && formData.actions.length > 0 ? (
                <div className="space-y-3">
                  {formData.actions.map((action, index) => (
                    <Card key={action.id} className="p-4 bg-muted/30">
                      <div className="flex gap-3">
                        <div className="flex items-center">
                          <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono">
                              #{index + 1}
                            </Badge>
                            <Select
                              value={action.type}
                              onValueChange={(value) => handleUpdateAction(action.id, { type: value as any })}
                            >
                              <SelectTrigger className="w-[200px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {actionTypeOptions.map(opt => (
                                  <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <Input
                              placeholder="Etiqueta"
                              value={action.label}
                              onChange={(e) => handleUpdateAction(action.id, { label: e.target.value })}
                            />
                            <Input
                              placeholder="Valor"
                              value={Array.isArray(action.value) ? action.value.join(', ') : action.value}
                              onChange={(e) => handleUpdateAction(action.id, { value: e.target.value })}
                            />
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveAction(action.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No hay acciones configuradas</p>
                  <p className="text-xs mt-1">Haz clic en "Agregar Acción" para comenzar</p>
                </div>
              )}
            </Card>
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t mt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button 
            type="submit"
            disabled={!formData.name || !formData.actions || formData.actions.length === 0}
          >
            <Save className="h-4 w-4 mr-2" />
            {flow ? 'Guardar Cambios' : 'Crear Flow'}
          </Button>
        </div>
      </form>
    </div>
  );
}
