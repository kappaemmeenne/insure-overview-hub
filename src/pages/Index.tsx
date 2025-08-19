import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatCards } from "@/components/dashboard/StatCards";
import { Charts } from "@/components/dashboard/Charts";
import { TimeFilters } from "@/components/dashboard/TimeFilters";
import { UrgentClaims } from "@/components/dashboard/UrgentClaims";
import type { AdvancedFilters } from "@/components/dashboard/AdvancedFiltersModal";

export type TimeFilter = "today" | "week" | "month" | "quarter" | "year";
export type StatusFilter = "pending" | "in_progress" | "completed" | "cancelled" | null;

const Index = () => {
  const [activeTimeFilter, setActiveTimeFilter] = useState<TimeFilter>("week");
  const [activeStatusFilter, setActiveStatusFilter] = useState<StatusFilter>(null);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
    dateFrom: undefined,
    dateTo: undefined,
    statuses: [],
    compagnies: [],
    tipologie: [],
    importoMin: 0,
    importoMax: 1000000,
    ratingMin: 0
  });

  const handleTimeFilterChange = (filter: TimeFilter) => {
    setActiveTimeFilter(filter);
    setActiveStatusFilter(null); // Reset status filter when changing time
  };

  const handleStatusFilterChange = (status: StatusFilter) => {
    setActiveStatusFilter(status);
  };

  const handleAdvancedFiltersChange = (filters: AdvancedFilters) => {
    setAdvancedFilters(filters);
    setActiveStatusFilter(null); // Reset status filter when using advanced filters
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar 
            activeStatusFilter={activeStatusFilter}
            onStatusFilterChange={handleStatusFilterChange}
          />
        </div>
        
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
            {/* Filtri Temporali */}
            <TimeFilters 
              activeFilter={activeTimeFilter}
              onFilterChange={handleTimeFilterChange}
              advancedFilters={advancedFilters}
              onAdvancedFiltersChange={handleAdvancedFiltersChange}
            />
            
            {/* Cards Statistiche */}
            <StatCards 
              timeFilter={activeTimeFilter}
              statusFilter={activeStatusFilter}
              advancedFilters={advancedFilters}
            />
            
            {/* Grafici */}
            <Charts 
              timeFilter={activeTimeFilter}
              statusFilter={activeStatusFilter}
              advancedFilters={advancedFilters}
            />
            
            {/* Sinistri Urgenti */}
            <UrgentClaims 
              timeFilter={activeTimeFilter}
              statusFilter={activeStatusFilter}
              advancedFilters={advancedFilters}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;