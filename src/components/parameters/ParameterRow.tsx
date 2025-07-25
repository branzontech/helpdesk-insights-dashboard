import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, AlertTriangle, Users } from "lucide-react";
import { ParameterItem } from "@/types/parameters";
import { useParameterToggle } from "@/hooks/useParameterToggle";

interface ParameterRowProps {
  parameter: ParameterItem;
}

export const ParameterRow = ({ parameter }: ParameterRowProps) => {
  const { isEnabled, toggle, isLoading } = useParameterToggle(parameter);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-orange-100 text-orange-800 border-orange-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors">
      <div className="flex items-center space-x-4 flex-1">
        <div className="text-2xl">{parameter.icon}</div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-1">
            <h3 className="font-semibold text-foreground">{parameter.name}</h3>
            <Badge variant="outline" className={`text-xs ${getImpactColor(parameter.impact)}`}>
              {parameter.impact}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2">
            {parameter.description}
          </p>
          
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{parameter.affectedUsers} usuarios</span>
            </div>
            
            {parameter.dependencies && parameter.dependencies.length > 0 && (
              <div className="flex items-center space-x-1">
                <AlertTriangle className="h-3 w-3" />
                <span>{parameter.dependencies.length} dependencias</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Info className="h-4 w-4" />
        </Button>
        
        <Switch
          checked={isEnabled}
          onCheckedChange={toggle}
          disabled={isLoading}
          className="data-[state=checked]:bg-primary"
        />
      </div>
    </div>
  );
};