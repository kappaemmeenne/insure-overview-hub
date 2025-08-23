import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClaimDetail from "./pages/ClaimDetail";
import Claims from "./pages/Claims";
import Calendar from "./pages/Calendar";
import Clients from "./pages/Clients";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import AssicuratoDashboard from "./pages/AssicuratoDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sinistri" element={<Claims />} />
          <Route path="/calendario" element={<Calendar />} />
          <Route path="/clienti" element={<Clients />} />
          <Route path="/report" element={<Report />} />
          <Route path="/impostazioni" element={<Settings />} />
          <Route path="/assicurato" element={<AssicuratoDashboard />} />
          <Route path="/claim/:id" element={<ClaimDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
