import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatCards } from "@/components/dashboard/StatCards";
import { Charts } from "@/components/dashboard/Charts";
import { TimeFilters } from "@/components/dashboard/TimeFilters";
import { UrgentClaims } from "@/components/dashboard/UrgentClaims";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
            {/* Filtri Temporali */}
            <TimeFilters />
            
            {/* Cards Statistiche */}
            <StatCards />
            
            {/* Grafici */}
            <Charts />
            
            {/* Sinistri Urgenti */}
            <UrgentClaims />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;