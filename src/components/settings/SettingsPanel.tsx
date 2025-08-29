import React, { useState, useMemo } from 'react';
import { Search, X, Settings2, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useSettingsData } from '@/hooks/useSettingsData';
import { SettingItem } from './SettingItem';
import type { SettingCategory } from '@/types/settings';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const { categories, settings, filteredSettings } = useSettingsData({
    searchTerm,
    selectedCategory
  });

  const settingsByCategory = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category.id] = filteredSettings.filter(setting => setting.categoryId === category.id);
      return acc;
    }, {} as Record<string, typeof filteredSettings>);
  }, [categories, filteredSettings]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-96 bg-card border-l shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-lg">Configuración</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar configuración..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Navigation */}
          <div className="p-4 border-b">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className="justify-start text-xs"
              >
                Todas
                <Badge variant="secondary" className="ml-auto">
                  {filteredSettings.length}
                </Badge>
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="justify-start text-xs"
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-auto">
                    {settingsByCategory[category.id]?.length || 0}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Settings Content */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {selectedCategory === 'all' ? (
                // Show all categories
                categories.map((category) => {
                  const categorySettings = settingsByCategory[category.id] || [];
                  if (categorySettings.length === 0) return null;
                  
                  return (
                    <div key={category.id} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <category.icon className="h-4 w-4 text-primary" />
                        <h3 className="font-medium text-sm text-foreground/80">
                          {category.name}
                        </h3>
                        <div className="h-px bg-border flex-1" />
                      </div>
                      <div className="space-y-2">
                        {categorySettings.map((setting) => (
                          <SettingItem key={setting.id} setting={setting} />
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                // Show specific category
                <div className="space-y-2">
                  {filteredSettings.map((setting) => (
                    <SettingItem key={setting.id} setting={setting} />
                  ))}
                </div>
              )}
              
              {filteredSettings.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Settings2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">
                    {searchTerm ? 'No se encontraron configuraciones' : 'No hay configuraciones disponibles'}
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};