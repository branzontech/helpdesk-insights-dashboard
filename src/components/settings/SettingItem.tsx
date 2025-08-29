import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Info, AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useSettingValue } from '@/hooks/useSettingValue';
import { PermissionsManager } from './PermissionsManager';
import type { Setting } from '@/types/settings';

interface SettingItemProps {
  setting: Setting;
}

export const SettingItem: React.FC<SettingItemProps> = ({ setting }) => {
  const { value, updateValue, isLoading } = useSettingValue(setting);

  const renderControl = () => {
    switch (setting.type) {
      case 'boolean':
        return (
          <Switch
            checked={value as boolean}
            onCheckedChange={updateValue}
            disabled={isLoading}
          />
        );

      case 'number':
        if (setting.slider) {
          return (
            <div className="space-y-2 w-full">
              <Slider
                value={[value as number]}
                onValueChange={([newValue]) => updateValue(newValue)}
                min={setting.min}
                max={setting.max}
                step={setting.step || 1}
                disabled={isLoading}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{setting.min}{setting.unit && ` ${setting.unit}`}</span>
                <span className="font-medium">
                  {value}{setting.unit && ` ${setting.unit}`}
                </span>
                <span>{setting.max}{setting.unit && ` ${setting.unit}`}</span>
              </div>
            </div>
          );
        }
        return (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={value as number}
              onChange={(e) => updateValue(Number(e.target.value))}
              min={setting.min}
              max={setting.max}
              disabled={isLoading}
              className="w-20 text-sm"
            />
            {setting.unit && (
              <span className="text-xs text-muted-foreground">{setting.unit}</span>
            )}
          </div>
        );

      case 'text':
        return (
          <Input
            value={value as string}
            onChange={(e) => updateValue(e.target.value)}
            placeholder={setting.placeholder}
            disabled={isLoading}
            className="text-sm"
          />
        );

      case 'select':
        return (
          <Select
            value={value as string}
            onValueChange={updateValue}
            disabled={isLoading}
          >
            <SelectTrigger className="w-32 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {setting.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'custom':
        if (setting.id === 'permissions_management') {
          return <PermissionsManager />;
        }
        return null;

      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "flex items-start gap-3 p-3 rounded-lg border bg-card/50 transition-colors",
      isLoading && "opacity-60"
    )}>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-medium text-foreground truncate">
            {setting.name}
          </h4>
          
          {setting.experimental && (
            <Badge variant="secondary" className="text-xs">
              Beta
            </Badge>
          )}
          
          {setting.impact === 'high' && (
            <Tooltip>
              <TooltipTrigger>
                <AlertTriangle className="h-3 w-3 text-destructive" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Configuración crítica</p>
              </TooltipContent>
            </Tooltip>
          )}
          
          {setting.description && (
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">{setting.description}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        
        {setting.subtitle && (
          <p className="text-xs text-muted-foreground">
            {setting.subtitle}
          </p>
        )}
        
        {setting.dependencies && setting.dependencies.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {setting.dependencies.map((dep) => (
              <Badge key={dep} variant="outline" className="text-xs">
                {dep}
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex-shrink-0">
        {renderControl()}
      </div>
    </div>
  );
};