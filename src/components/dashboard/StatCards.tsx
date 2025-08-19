import { TrendingUp, TrendingDown, Clock, CheckCircle, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TimeFilter, StatusFilter } from "@/pages/Index";
import type { AdvancedFilters } from "./AdvancedFiltersModal";

interface StatCardsProps {
  timeFilter: TimeFilter;
  statusFilter: StatusFilter;
  advancedFilters: AdvancedFilters;
}

const stats = [
  {
    title: "Sinistri Totali",
    value: "68",
    change: "+12%",
    trend: "up",
    icon: CheckCircle,
    description: "vs mese scorso"
  },
  {
    title: "In Lavorazione",
    value: "23",
    change: "-8%",
    trend: "down", 
    icon: Clock,
    description: "vs settimana scorsa"
  },
  {
    title: "Tempo Medio",
    value: "5.2 giorni",
    change: "+0.3",
    trend: "up",
    icon: TrendingUp,
    description: "per completamento"
  },
  {
    title: "Soddisfazione",
    value: "94%",
    change: "+2%",
    trend: "up",
    icon: TrendingUp,
    description: "clienti soddisfatti"
  }
];

export const StatCards = ({ timeFilter, statusFilter, advancedFilters }: StatCardsProps) => {
  // Simula il filtro dei dati basato sui filtri attivi
  const getFilteredStats = () => {
    let filteredStats = [...stats];
    
    // Esempio di come i filtri influenzerebbero i dati
    if (statusFilter) {
      // Modifica i valori in base al filtro di status
      switch (statusFilter) {
        case 'pending':
          filteredStats[0].value = "12";
          filteredStats[1].value = "€1,240,000";
          break;
        case 'in_progress':
          filteredStats[0].value = "8";
          filteredStats[1].value = "€890,000";
          break;
        case 'completed':
          filteredStats[0].value = "45";
          filteredStats[1].value = "€4,320,000";
          break;
        case 'cancelled':
          filteredStats[0].value = "3";
          filteredStats[1].value = "€45,000";
          break;
      }
    }
    
    // Modifica i valori in base al filtro temporale
    switch (timeFilter) {
      case 'today':
        filteredStats[0].value = "3";
        filteredStats[1].value = "€156,000";
        break;
      case 'week':
        filteredStats[0].value = "12";
        filteredStats[1].value = "€892,000";
        break;
      case 'month':
        filteredStats[0].value = "68";
        filteredStats[1].value = "€6,240,000";
        break;
    }
    
    return filteredStats;
  };

  const filteredStats = getFilteredStats();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredStats.map((stat, index) => (
        <Card key={index} className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="flex items-center space-x-1 text-xs">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-success" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={stat.trend === "up" ? "text-success" : "text-destructive"}>
                {stat.change}
              </span>
              <span className="text-muted-foreground">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};