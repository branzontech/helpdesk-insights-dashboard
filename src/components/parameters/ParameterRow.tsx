import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, AlertTriangle, Users } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { ParameterItem } from "@/types/parameters";
import { useParameterValue } from "@/hooks/useParameterValue";

interface ParameterRowProps {
  parameter: ParameterItem;
}

export const ParameterRow = ({ parameter }: ParameterRowProps) => {
  const { value, updateValue, isLoading } = useParameterValue(parameter);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "medium": return "bg-orange-100 text-orange-700 border-orange-200";
      case "low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const renderControl = () => {
    switch (parameter.type) {
      case "boolean":
        return (
          <Switch
            checked={value as boolean}
            onCheckedChange={updateValue}
            disabled={isLoading}
            className="data-[state=checked]:bg-primary"
          />
        );
      
      case "number":
        return (
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={value as number}
              onChange={(e) => updateValue(parseInt(e.target.value) || 0)}
              min={parameter.min}
              max={parameter.max}
              disabled={isLoading}
              className="w-20 h-8 text-sm"
            />
            {parameter.unit && (
              <span className="text-xs text-muted-foreground">{parameter.unit}</span>
            )}
          </div>
        );
      
      case "select":
        return (
          <Select value={value as string} onValueChange={updateValue} disabled={isLoading}>
            <SelectTrigger className="w-24 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {parameter.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case "text":
        return (
          <Input
            type="text"
            value={value as string}
            onChange={(e) => updateValue(e.target.value)}
            disabled={isLoading}
            className="w-32 h-8 text-sm"
          />
        );
      
      default:
        return null;
    }
  };

  const IconComponent = (LucideIcons as any)[parameter.icon];

  return (
    <div className="flex items-center justify-between px-6 py-3 hover:bg-muted/30 transition-colors">
      <div className="flex items-center space-x-3 flex-1">
        <div className="text-muted-foreground">
          {IconComponent && <IconComponent className="h-5 w-5" />}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-medium text-sm text-foreground truncate">{parameter.name}</h3>
            <Badge variant="outline" className={`text-xs px-1.5 py-0.5 ${getImpactColor(parameter.impact)}`}>
              {parameter.impact}
            </Badge>
          </div>
          
          <p className="text-xs text-muted-foreground mb-1 line-clamp-1">
            {parameter.description}
          </p>
          
          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{parameter.affectedUsers}</span>
            </div>
            
            {parameter.dependencies && parameter.dependencies.length > 0 && (
              <div className="flex items-center space-x-1">
                <AlertTriangle className="h-3 w-3" />
                <span>{parameter.dependencies.length} dep</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <Info className="h-3 w-3" />
        </Button>
        
        {renderControl()}
      </div>
    </div>
  );
};