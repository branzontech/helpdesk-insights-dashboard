import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import TicketLayout from "./components/ticket/TicketLayout";
import KnowledgeBaseLayout from "./components/knowledge/KnowledgeBaseLayout";
import ParametersLayout from "./components/parameters/ParametersLayout";
import SmartFlows from "./pages/SmartFlows";
import { TourProvider } from "./components/tour/TourProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TourProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Index />} />
            <Route path="/tickets" element={<TicketLayout />} />
            <Route path="/ticket/:id" element={<TicketLayout />} />
            <Route path="/knowledge" element={<KnowledgeBaseLayout />} />
            <Route path="/parameters" element={<ParametersLayout />} />
            <Route path="/smartflows" element={<SmartFlows />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </TourProvider>
  </QueryClientProvider>
);

export default App;
