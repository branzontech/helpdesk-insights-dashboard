import { useState } from "react";
import { ParameterItem } from "@/types/parameters";
import { useToast } from "@/hooks/use-toast";

export const useParameterToggle = (parameter: ParameterItem) => {
  const [isEnabled, setIsEnabled] = useState(parameter.enabled);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const toggle = async () => {
    setIsLoading(true);
    
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newStatus = !isEnabled;
      setIsEnabled(newStatus);
      
      toast({
        title: newStatus ? "Funcionalidad habilitada" : "Funcionalidad deshabilitada",
        description: `${parameter.name} ha sido ${newStatus ? "activada" : "desactivada"} correctamente.`,
        variant: newStatus ? "default" : "destructive"
      });
      
      // Aquí iría la lógica para verificar dependencias
      if (!newStatus && parameter.dependencies) {
        toast({
          title: "Verificar dependencias",
          description: "Algunas funcionalidades pueden verse afectadas.",
          variant: "default"
        });
      }
      
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cambiar el estado de la funcionalidad.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isEnabled,
    toggle,
    isLoading
  };
};