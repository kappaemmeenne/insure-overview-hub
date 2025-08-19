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
        <Sidebar />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Filtri Temporali */}
            <TimeFilters />
            
            {/* Cards Statistiche */}
            <StatCards />
            
            {/* Grafici e Sinistri Urgenti */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <Charts />
              </div>
              <div className="xl:col-span-1">
                <UrgentClaims />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;