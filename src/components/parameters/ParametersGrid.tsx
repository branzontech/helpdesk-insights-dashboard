import { ParameterRow } from "./ParameterRow";
import { ParameterItem } from "@/types/parameters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Funcionalidades del Sistema</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {parameters.map((parameter) => (
            <ParameterRow key={parameter.id} parameter={parameter} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};