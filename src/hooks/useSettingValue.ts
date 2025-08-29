import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Setting } from '@/types/settings';

export const useSettingValue = (setting: Setting) => {
  const [value, setValue] = useState(setting.value);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const updateValue = async (newValue: boolean | number | string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setValue(newValue);
      
      let message = '';
      switch (setting.type) {
        case 'boolean':
          message = `${setting.name} ha sido ${newValue ? 'activada' : 'desactivada'}`;
          break;
        case 'number':
          message = `${setting.name} actualizado a ${newValue}${setting.unit ? ` ${setting.unit}` : ''}`;
          break;
        case 'select':
          const option = setting.options?.find(opt => opt.value === newValue);
          message = `${setting.name} cambiado a ${option?.label || newValue}`;
          break;
        default:
          message = `${setting.name} actualizado`;
      }
      
      toast({
        title: 'Configuración actualizada',
        description: message,
        variant: 'default'
      });
      
      // Check for high impact settings
      if (setting.impact === 'high') {
        toast({
          title: 'Configuración crítica modificada',
          description: 'Los cambios pueden afectar el funcionamiento del sistema.',
          variant: 'default'
        });
      }
      
      // Check dependencies for boolean settings
      if (setting.type === 'boolean' && !newValue && setting.dependencies) {
        toast({
          title: 'Verificar dependencias',
          description: 'Algunas funcionalidades pueden verse afectadas.',
          variant: 'default'
        });
      }
      
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar la configuración.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    value,
    updateValue,
    isLoading
  };
};