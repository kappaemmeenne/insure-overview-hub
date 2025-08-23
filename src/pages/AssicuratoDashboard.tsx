import { NotificationsSection } from "@/components/assicurato/NotificationsSection";
import { TodoSection } from "@/components/assicurato/TodoSection";
import { PratichesSection } from "@/components/assicurato/PratichesSection";
import { DashboardHeader } from "@/components/assicurato/DashboardHeader";

const AssicuratoDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="container mx-auto p-6 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            La Tua Area Personale
          </h1>
          <p className="text-muted-foreground text-lg">
            Gestisci le tue pratiche assicurative in modo semplice e veloce
          </p>
        </div>

        <NotificationsSection />
        <TodoSection />
        <PratichesSection />
      </div>
    </div>
  );
};

export default AssicuratoDashboard;