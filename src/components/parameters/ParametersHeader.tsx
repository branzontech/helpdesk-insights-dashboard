import { Settings, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const ParametersHeader = () => {
  return (
    <div className="border-b bg-card">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Parámetros Generales
              </h1>
              <p className="text-muted-foreground">
                Configura las funcionalidades según las necesidades de tu empresa
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="flex items-center space-x-2">
              <Shield className="h-3 w-3" />
              <span>Admin</span>
            </Badge>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Gestionar Permisos
            </Button>
            <Button size="sm">
              Guardar Cambios
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};