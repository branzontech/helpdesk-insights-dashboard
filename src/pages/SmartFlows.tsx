import { useState } from 'react';
import { Zap, Plus, Search, Edit, Trash2, Copy, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { smartFlows, smartFlowCategories } from '@/lib/smartFlowData';
import { SmartFlow } from '@/types/smartFlow';
import { SmartFlowEditor } from '@/components/smartflow/SmartFlowEditor';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

const iconMap: Record<string, any> = {
  CheckCircle: 'CheckCircle',
  MessageCircle: 'MessageCircle',
  ArrowUpCircle: 'ArrowUpCircle',
  Users: 'Users',
  CreditCard: 'CreditCard',
  AlertTriangle: 'AlertTriangle',
};

const colorMap: Record<string, string> = {
  green: 'bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20',
  blue: 'bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20',
  orange: 'bg-orange-500/10 text-orange-600 border-orange-500/20 hover:bg-orange-500/20',
  purple: 'bg-purple-500/10 text-purple-600 border-purple-500/20 hover:bg-purple-500/20',
  cyan: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20 hover:bg-cyan-500/20',
  red: 'bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20',
};

export default function SmartFlows() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlow, setSelectedFlow] = useState<SmartFlow | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const filteredFlows = smartFlows.filter(flow => {
    const matchesSearch = flow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flow.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || flow.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateNew = () => {
    setSelectedFlow(null);
    setIsEditing(true);
  };

  const handleEdit = (flow: SmartFlow) => {
    setSelectedFlow(flow);
    setIsEditing(true);
  };

  const handleDuplicate = (flow: SmartFlow) => {
    toast({
      title: 'Flow Duplicado',
      description: `"${flow.name}" ha sido duplicado.`,
    });
  };

  const handleDelete = (flow: SmartFlow) => {
    toast({
      title: 'Flow Eliminado',
      description: `"${flow.name}" ha sido eliminado.`,
      variant: 'destructive',
    });
  };

  const handleSave = (flow: SmartFlow) => {
    toast({
      title: selectedFlow ? 'Flow Actualizado' : 'Flow Creado',
      description: `"${flow.name}" ha sido ${selectedFlow ? 'actualizado' : 'creado'} exitosamente.`,
    });
    setIsEditing(false);
    setSelectedFlow(null);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-h-0">
        <Header />
        
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="border-b bg-background px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-6 w-6 text-primary" />
                    <h1 className="text-2xl font-bold">Smart Flows</h1>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Automatiza acciones comunes con flujos predefinidos
                  </p>
                </div>
                <Button onClick={handleCreateNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Flow
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden p-6">
              {isEditing ? (
                <SmartFlowEditor
                  flow={selectedFlow}
                  onSave={handleSave}
                  onCancel={() => {
                    setIsEditing(false);
                    setSelectedFlow(null);
                  }}
                />
              ) : (
                <div className="h-full flex flex-col">
                  {/* Filters */}
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar flows..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  {/* Tabs */}
                  <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1 flex flex-col min-h-0">
                    <TabsList className="w-full justify-start mb-4">
                      <TabsTrigger value="all">Todos ({smartFlows.length})</TabsTrigger>
                      {smartFlowCategories.map(cat => (
                        <TabsTrigger key={cat.id} value={cat.id}>
                          {cat.name} ({cat.flows.length})
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    <ScrollArea className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                        {filteredFlows.map((flow) => (
                          <Card
                            key={flow.id}
                            className={`p-4 border transition-all cursor-pointer ${colorMap[flow.color]}`}
                          >
                            <div className="space-y-3">
                              {/* Header */}
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-sm">{flow.name}</h3>
                                  <p className="text-xs opacity-80 mt-1">{flow.description}</p>
                                </div>
                              </div>

                              {/* Stats */}
                              <div className="flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-1">
                                  <TrendingUp className="h-3 w-3" />
                                  <span>{flow.usageCount} usos</span>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {flow.actions.length} acciones
                                </Badge>
                              </div>

                              {/* Actions */}
                              <div className="flex gap-2 pt-2 border-t">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEdit(flow)}
                                  className="flex-1 h-8"
                                >
                                  <Edit className="h-3 w-3 mr-1" />
                                  Editar
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDuplicate(flow)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(flow)}
                                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>

                      {filteredFlows.length === 0 && (
                        <div className="text-center py-12">
                          <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-semibold mb-2">No se encontraron flows</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Intenta con otros términos de búsqueda
                          </p>
                        </div>
                      )}
                    </ScrollArea>
                  </Tabs>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
