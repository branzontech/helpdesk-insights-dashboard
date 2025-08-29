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
              <div className="flex items-center gap-3 mb-4">
                <Settings2 className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
                  <nav className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>Dashboard</span>
                    <span>/</span>
                    <span className="text-foreground font-medium">Configuración</span>
                  </nav>
                </div>
              </div>
              <p className="text-muted-foreground">
                Gestiona las configuraciones del sistema y personaliza tu experiencia
              </p>
              {/* Debug info */}
              <div className="text-xs text-muted-foreground mt-2">
                Categoría seleccionada: {selectedCategory} | Configuraciones filtradas: {filteredSettings.length}
              </div>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border p-6 sticky top-8 h-[calc(100vh-200px)] flex flex-col">
                {/* Search */}
                <div className="mb-6 flex-shrink-0">
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

                {/* Category Navigation with Scroll */}
                <ScrollArea className="flex-1 -mx-2 px-2">
                  <div className="space-y-2 pr-4">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">
                      Categorías
                    </h3>
                    
                    <Button
                      variant={selectedCategory === 'all' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setSelectedCategory('all')}
                      className="w-full justify-start transition-all duration-200 hover:scale-[1.02]"
                    >
                      <Settings2 className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Todas</span>
                    </Button>
                    
                    <div className="space-y-1 animate-fade-in">
                      {categories.map((category, index) => {
                        const categorySettings = settingsByCategory[category.id] || [];
                        const isOpen = openCategories[category.id];
                        
                        return (
                          <div 
                            key={category.id} 
                            className="space-y-1"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <Collapsible open={isOpen} onOpenChange={() => toggleCategory(category.id)}>
                              <CollapsibleTrigger asChild>
                                <Button
                                  variant={selectedCategory === category.id ? 'default' : 'ghost'}
                                  size="sm"
                                  className="w-full justify-start transition-all duration-200 hover:scale-[1.02] hover:bg-muted/70"
                                >
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <category.icon className="h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">{category.name}</span>
                                  </div>
                                  <div className="transition-transform duration-200 flex-shrink-0">
                                    {isOpen ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4" />
                                    )}
                                  </div>
                                </Button>
                              </CollapsibleTrigger>
                              
                              <CollapsibleContent className="space-y-1 animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                                <div className="pl-2 space-y-1">
                                  {categorySettings.slice(0, 5).map((setting, settingIndex) => (
                                    <Button
                                      key={setting.id}
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setSelectedCategory(category.id)}
                                      className="w-full justify-start pl-6 text-xs text-muted-foreground hover:text-foreground transition-all duration-150 hover:translate-x-1 hover:bg-muted/50"
                                      style={{ animationDelay: `${settingIndex * 30}ms` }}
                                    >
                                      <span className="truncate">{setting.name}</span>
                                    </Button>
                                  ))}
                                  {categorySettings.length > 5 && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setSelectedCategory(category.id)}
                                      className="w-full justify-start pl-6 text-xs text-muted-foreground hover:text-foreground transition-all duration-150 hover:translate-x-1 hover:bg-muted/50 font-medium"
                                    >
                                      <span className="truncate">Ver todas ({categorySettings.length})</span>
                                    </Button>
                                  )}
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-lg border animate-fade-in">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <div className="p-6 space-y-8">
                    {selectedCategory === 'all' ? (
                      // Show all categories
                      categories.map((category, index) => {
                        const categorySettings = settingsByCategory[category.id] || [];
                        if (categorySettings.length === 0) return null;
                        
                        return (
                          <div 
                            key={category.id} 
                            className="space-y-4 animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
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
                              {categorySettings.map((setting, settingIndex) => (
                                <div 
                                  key={setting.id}
                                  className="animate-fade-in hover:scale-[1.01] transition-transform duration-200"
                                  style={{ animationDelay: `${(index * 100) + (settingIndex * 50)}ms` }}
                                >
                                  <SettingItem setting={setting} />
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      // Show specific category
                      <div className="space-y-4 animate-fade-in">
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
                          {filteredSettings.map((setting, index) => (
                            <div 
                              key={setting.id}
                              className="animate-fade-in hover:scale-[1.01] transition-transform duration-200"
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <SettingItem setting={setting} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {filteredSettings.length === 0 && (
                      <div className="text-center py-12 animate-fade-in">
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