import { useState } from 'react';
import { 
  CheckCircle, MessageCircle, ArrowUpCircle, Users, 
  CreditCard, AlertTriangle, Zap, Search, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { smartFlows, smartFlowCategories } from '@/lib/smartFlowData';
import { SmartFlow } from '@/types/smartFlow';
import { useToast } from '@/hooks/use-toast';

const iconMap: Record<string, any> = {
  CheckCircle,
  MessageCircle,
  ArrowUpCircle,
  Users,
  CreditCard,
  AlertTriangle,
};

const colorMap: Record<string, string> = {
  green: 'bg-green-500/10 text-green-600 border-green-500/20',
  blue: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  orange: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  purple: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  cyan: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
  red: 'bg-red-500/10 text-red-600 border-red-500/20',
};

interface SmartFlowPanelProps {
  ticketId: string;
  onApplyFlow?: (flow: SmartFlow) => void;
}

export function SmartFlowPanel({ ticketId, onApplyFlow }: SmartFlowPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlow, setSelectedFlow] = useState<SmartFlow | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const filteredFlows = smartFlows.filter(flow =>
    flow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flow.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topFlows = [...smartFlows]
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, 3);

  const handleFlowClick = (flow: SmartFlow) => {
    setSelectedFlow(flow);
    setShowPreview(true);
  };

  const handleApplyFlow = () => {
    if (selectedFlow) {
      onApplyFlow?.(selectedFlow);
      toast({
        title: 'Smart Flow Aplicado',
        description: `"${selectedFlow.name}" se ha aplicado correctamente al ticket.`,
      });
      setShowPreview(false);
      setSelectedFlow(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Smart Flows</h3>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar flows..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-6 pr-4">
          {/* Top Flows */}
          {!searchQuery && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Más Usados</span>
              </div>
              <div className="space-y-2">
                {topFlows.map((flow) => {
                  const Icon = iconMap[flow.icon];
                  return (
                    <button
                      key={flow.id}
                      onClick={() => handleFlowClick(flow)}
                      className={`w-full p-3 rounded-lg border transition-all hover:shadow-md text-left ${colorMap[flow.color]}`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{flow.name}</div>
                          <div className="text-xs opacity-80 mt-0.5">{flow.description}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {flow.actions.length} acciones
                            </Badge>
                            <span className="text-xs opacity-60">Usado {flow.usageCount} veces</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Categories */}
          {searchQuery ? (
            <div className="space-y-2">
              <span className="text-sm font-medium">Resultados</span>
              {filteredFlows.length === 0 ? (
                <p className="text-sm text-muted-foreground py-8 text-center">
                  No se encontraron flows
                </p>
              ) : (
                filteredFlows.map((flow) => {
                  const Icon = iconMap[flow.icon];
                  return (
                    <button
                      key={flow.id}
                      onClick={() => handleFlowClick(flow)}
                      className={`w-full p-3 rounded-lg border transition-all hover:shadow-md text-left ${colorMap[flow.color]}`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{flow.name}</div>
                          <div className="text-xs opacity-80 mt-0.5">{flow.description}</div>
                          <Badge variant="secondary" className="text-xs mt-2">
                            {flow.actions.length} acciones
                          </Badge>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          ) : (
            smartFlowCategories.map((category) => (
              <div key={category.id} className="space-y-3">
                <Separator />
                <div>
                  <h4 className="font-medium text-sm">{category.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{category.description}</p>
                </div>
                <div className="space-y-2">
                  {category.flows.map((flow) => {
                    const Icon = iconMap[flow.icon];
                    return (
                      <button
                        key={flow.id}
                        onClick={() => handleFlowClick(flow)}
                        className={`w-full p-3 rounded-lg border transition-all hover:shadow-md text-left ${colorMap[flow.color]}`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{flow.name}</div>
                            <div className="text-xs opacity-80 mt-0.5">{flow.description}</div>
                            <Badge variant="secondary" className="text-xs mt-2">
                              {flow.actions.length} acciones
                            </Badge>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedFlow && iconMap[selectedFlow.icon] && (
                <>
                  {(() => {
                    const Icon = iconMap[selectedFlow.icon];
                    return <Icon className="h-5 w-5 text-primary" />;
                  })()}
                </>
              )}
              {selectedFlow?.name}
            </DialogTitle>
            <DialogDescription>{selectedFlow?.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-3">Acciones que se aplicarán:</h4>
              <div className="space-y-2">
                {selectedFlow?.actions.map((action, index) => (
                  <div
                    key={action.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{action.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 break-words">
                        {Array.isArray(action.value) ? action.value.join(', ') : action.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => setShowPreview(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleApplyFlow} className="flex-1">
                <Zap className="h-4 w-4 mr-2" />
                Aplicar Flow
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
