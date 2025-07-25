import { ParameterCard } from "./ParameterCard";
import { ParameterItem } from "@/types/parameters";

interface ParametersGridProps {
  parameters: ParameterItem[];
}

export const ParametersGrid = ({ parameters }: ParametersGridProps) => {
  if (parameters.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-lg mb-2">
          No se encontraron funcionalidades
        </div>
        <p className="text-sm text-muted-foreground">
          Prueba ajustando los filtros de búsqueda
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {parameters.map((parameter) => (
        <ParameterCard key={parameter.id} parameter={parameter} />
      ))}
    </div>
  );
};