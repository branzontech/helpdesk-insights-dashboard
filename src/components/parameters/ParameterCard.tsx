import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, AlertTriangle, Users } from "lucide-react";
import { ParameterItem } from "@/types/parameters";
import { useParameterToggle } from "@/hooks/useParameterToggle";

interface ParameterCardProps {
  parameter: ParameterItem;
}

export const ParameterCard = ({ parameter }: ParameterCardProps) => {
  const { isEnabled, toggle, isLoading } = useParameterToggle(parameter);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "text-red-600 bg-red-50";
      case "medium": return "text-orange-600 bg-orange-50";
      case "low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-200 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{parameter.icon}</div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold leading-tight">
                {parameter.name}
              </CardTitle>
              <CardDescription className="text-sm mt-1">
                {parameter.description}
              </CardDescription>
            </div>
          </div>
          <Switch
            checked={isEnabled}
            onCheckedChange={toggle}
            disabled={isLoading}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Status and Impact */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={getImpactColor(parameter.impact)}>
              Impacto {parameter.impact}
            </Badge>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{parameter.affectedUsers} usuarios</span>
            </div>
          </div>

          {/* Dependencies */}
          {parameter.dependencies && parameter.dependencies.length > 0 && (
            <div className="text-xs text-muted-foreground">
              <div className="flex items-center space-x-1 mb-1">
                <AlertTriangle className="h-3 w-3" />
                <span>Dependencias:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {parameter.dependencies.map((dep, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {dep}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Info Button */}
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Info className="h-3 w-3 mr-1" />
              Más info
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};