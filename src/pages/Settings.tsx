import React, { useState, useMemo } from 'react';
import { Search, Settings2, ChevronDown, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useSettingsData } from '@/hooks/useSettingsData';
import { SettingItem } from '@/components/settings/SettingItem';
import Sidebar from '@/components/dashboard/Sidebar';

export default function Settings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  
  const { categories, filteredSettings } = useSettingsData({
    searchTerm,
    selectedCategory
  });

  const settingsByCategory = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category.id] = filteredSettings.filter(setting => setting.categoryId === category.id);
      return acc;
    }, {} as Record<string, typeof filteredSettings>);
  }, [categories, filteredSettings]);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-64">
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Settings2 className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
            </div>
            <p className="text-muted-foreground">
              Gestiona las configuraciones del sistema y personaliza tu experiencia
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border p-6 sticky top-8">
                {/* Search */}
                <div className="mb-6">
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
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">
                    Categorías
                  </h3>
                  
                  <Button
                    variant={selectedCategory === 'all' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedCategory('all')}
                    className="w-full justify-start"
                  >
                    <Settings2 className="h-4 w-4 mr-2" />
                    <span>Todas las configuraciones</span>
                  </Button>
                  
                  {categories.map((category) => {
                    const categorySettings = settingsByCategory[category.id] || [];
                    const isOpen = openCategories[category.id];
                    
                    return (
                      <div key={category.id} className="space-y-1">
                        <Collapsible open={isOpen} onOpenChange={() => toggleCategory(category.id)}>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start hover:bg-muted/50"
                            >
                              <div className="flex items-center gap-2 flex-1">
                                <category.icon className="h-4 w-4" />
                                <span>{category.name}</span>
                              </div>
                              {isOpen ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>
                          
                          <CollapsibleContent className="space-y-1">
                            {categorySettings.slice(0, 5).map((setting) => (
                              <Button
                                key={setting.id}
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedCategory(category.id)}
                                className="w-full justify-start pl-8 text-xs text-muted-foreground hover:text-foreground"
                              >
                                <span className="truncate">{setting.name}</span>
                              </Button>
                            ))}
                            {categorySettings.length > 5 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedCategory(category.id)}
                                className="w-full justify-start pl-8 text-xs text-muted-foreground hover:text-foreground"
                              >
                                <span>Ver todas ({categorySettings.length})</span>
                              </Button>
                            )}
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-lg border">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <div className="p-6 space-y-8">
                    {selectedCategory === 'all' ? (
                      // Show all categories
                      categories.map((category) => {
                        const categorySettings = settingsByCategory[category.id] || [];
                        if (categorySettings.length === 0) return null;
                        
                        return (
                          <div key={category.id} className="space-y-4">
                            <div className="flex items-center gap-3 pb-3 border-b">
                              <category.icon className="h-5 w-5 text-primary" />
                              <div>
                                <h2 className="font-semibold text-lg text-foreground">
                                  {category.name}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                  {category.description}
                                </p>
                              </div>
                            </div>
                            <div className="grid gap-4">
                              {categorySettings.map((setting) => (
                                <SettingItem key={setting.id} setting={setting} />
                              ))}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      // Show specific category
                      <div className="space-y-4">
                        {(() => {
                          const category = categories.find(c => c.id === selectedCategory);
                          return category ? (
                            <div className="flex items-center gap-3 pb-3 border-b">
                              <category.icon className="h-5 w-5 text-primary" />
                              <div>
                                <h2 className="font-semibold text-lg text-foreground">
                                  {category.name}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                  {category.description}
                                </p>
                              </div>
                            </div>
                          ) : null;
                        })()}
                        
                        <div className="grid gap-4">
                          {filteredSettings.map((setting) => (
                            <SettingItem key={setting.id} setting={setting} />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {filteredSettings.length === 0 && (
                      <div className="text-center py-12">
                        <Settings2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-medium text-foreground mb-2">
                          No se encontraron configuraciones
                        </h3>
                        <p className="text-muted-foreground">
                          {searchTerm 
                            ? 'Intenta con otros términos de búsqueda' 
                            : 'No hay configuraciones disponibles en esta categoría'
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}