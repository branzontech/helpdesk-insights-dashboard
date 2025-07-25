import { useState } from "react";
import { ParameterItem } from "@/types/parameters";
import { useToast } from "@/hooks/use-toast";

export const useParameterValue = (parameter: ParameterItem) => {
  const [value, setValue] = useState(parameter.value);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const updateValue = async (newValue: boolean | number | string) => {
    setIsLoading(true);
    
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setValue(newValue);
      
      const message = parameter.type === "boolean" 
        ? `${parameter.name} ha sido ${newValue ? "activada" : "desactivada"}`
        : `${parameter.name} actualizado a ${newValue}${parameter.unit ? ` ${parameter.unit}` : ""}`;
      
      toast({
        title: "Configuración actualizada",
        description: message,
        variant: "default"
      });
      
      // Verificar dependencias para parámetros booleanos
      if (parameter.type === "boolean" && !newValue && parameter.dependencies) {
        toast({
          title: "Verificar dependencias",
          description: "Algunas funcionalidades pueden verse afectadas.",
          variant: "default"
        });
      }
      
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar la configuración.",
        variant: "destructive"
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