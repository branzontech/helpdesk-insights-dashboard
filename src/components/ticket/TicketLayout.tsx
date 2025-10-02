import React from 'react';
import { useParams } from 'react-router-dom';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import TicketList from './TicketList';
import TicketViewEnhanced from './TicketViewEnhanced';
import TicketCreator from './TicketCreator';
import { Button } from '@/components/ui/button';
import { Plus, Settings, Bell } from 'lucide-react';
import { useTickets } from '@/hooks/useTickets';
import { useTour } from '@/hooks/useTour';
import { ticketsTourSteps } from '@/data/tourSteps';
import Joyride from 'react-joyride';

const TicketLayout = () => {
  const { id } = useParams<{ id: string }>();
  const { tourProps } = useTour({
    key: 'tickets',
    steps: ticketsTourSteps,
  });
  
  const {
    tickets,
    selectedTicket,
    selectedTicketId,
    searchQuery,
    statusFilter,
    priorityFilter,
    showHistory,
    setSelectedTicketId,
    setSearchQuery,
    setStatusFilter,
    setPriorityFilter,
    setShowHistory,
    createTicket,
    updateTicket,
    addMessage
  } = useTickets();

  // Set initial selected ticket from URL
  React.useEffect(() => {
    if (id && id !== selectedTicketId) {
      setSelectedTicketId(id);
    }
  }, [id, selectedTicketId, setSelectedTicketId]);

  return (
    <>
      <Joyride {...tourProps} />
      <div className="h-screen bg-background flex flex-col">
        {/* Top Header */}
        <header className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4" data-tour="tickets-header">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Support Center</h1>
            <div className="text-sm text-muted-foreground">
              {tickets.length} total tickets
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <TicketCreator onCreateTicket={createTicket}>
              <Button className="flex items-center space-x-2" data-tour="new-ticket-btn">
                <Plus className="h-4 w-4" />
                <span>New Ticket</span>
              </Button>
            </TicketCreator>
          </div>
        </header>

      {/* Main Content with Resizable Panels */}
      <div className="flex-1 overflow-hidden min-h-0">
        <PanelGroup direction="horizontal">
          {/* Ticket List Panel */}
          <Panel defaultSize={25} minSize={20} maxSize={40}>
            <div data-tour="tickets-list" className="h-full min-h-0 flex flex-col">
              <TicketList
                tickets={tickets}
                selectedTicketId={selectedTicketId}
                onTicketSelect={setSelectedTicketId}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityFilterChange={setPriorityFilter}
                showHistory={showHistory}
                onShowHistoryChange={setShowHistory}
                onAssignAgent={(ticketId) => {
                  // TODO: Implementar lógica de asignación de agente
                  console.log('Asignar agente a ticket:', ticketId);
                }}
              />
            </div>
          </Panel>
          
          <PanelResizeHandle className="w-1 bg-border hover:bg-border/80 transition-colors" />
          
          {/* Ticket View Panel */}
          <Panel defaultSize={75} minSize={50}>
            <div data-tour="ticket-view" className="h-full min-h-0 flex flex-col">
              {selectedTicket ? (
                <TicketViewEnhanced
                  ticket={selectedTicket}
                  onUpdateTicket={(updates) => updateTicket(selectedTicket.id, updates)}
                  onAddMessage={(content, isPrivate) => addMessage(selectedTicket.id, content, isPrivate)}
                />
              ) : (
              <div className="h-full flex items-center justify-center bg-muted/20">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
                    <Plus className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">No ticket selected</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Select a ticket from the list to view its details and manage conversations
                    </p>
                  </div>
                  <TicketCreator onCreateTicket={createTicket}>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Ticket
                    </Button>
                  </TicketCreator>
                </div>
              </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
    </>
  );
};

export default TicketLayout;