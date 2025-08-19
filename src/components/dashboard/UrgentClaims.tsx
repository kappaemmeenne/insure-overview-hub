import { Clock, AlertTriangle, User, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TimeFilter, StatusFilter } from "@/pages/Index";
import type { AdvancedFilters } from "./AdvancedFiltersModal";

interface UrgentClaimsProps {
  timeFilter: TimeFilter;
  statusFilter: StatusFilter;
  advancedFilters: AdvancedFilters;
}

const urgentClaims = [
  {
    id: "SIN-2024-001",
    client: "Mario Bianchi",
    location: "Via Roma, 123 - Milano",
    type: "Incidente Stradale",
    priority: "Alta",
    daysOverdue: 3,
    amount: "€15.250"
  },
  {
    id: "SIN-2024-045",
    client: "Giulia Verdi",
    location: "Corso Italia, 45 - Torino", 
    type: "Danni da Grandine",
    priority: "Media",
    daysOverdue: 1,
    amount: "€8.900"
  },
  {
    id: "SIN-2024-078",
    client: "Luca Neri",
    location: "Piazza Duomo, 12 - Firenze",
    type: "Furto Auto",
    priority: "Alta",
    daysOverdue: 5,
    amount: "€22.500"
  }
];

export const UrgentClaims = ({ timeFilter, statusFilter, advancedFilters }: UrgentClaimsProps) => {
  return (
    <Card className="stat-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <span>Sinistri in Ritardo</span>
        </CardTitle>
        <Badge variant="destructive" className="text-xs">
          {urgentClaims.length} sinistri
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {urgentClaims.map((claim) => (
          <div key={claim.id} className="border border-border rounded-lg p-3 lg:p-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:space-x-4">
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
                  <span className="font-medium text-foreground text-sm lg:text-base">{claim.id}</span>
                  <Badge 
                    variant={claim.priority === "Alta" ? "destructive" : "secondary"}
                    className="text-xs w-fit"
                  >
                    {claim.priority}
                  </Badge>
                </div>
                
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{claim.client}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{claim.location}</span>
                  </div>
                </div>
                
                <div className="text-sm">
                  <span className="text-muted-foreground">Tipo: </span>
                  <span className="font-medium text-foreground">{claim.type}</span>
                </div>
              </div>
              
              <div className="flex flex-col lg:items-end space-y-3 mt-3 lg:mt-0 lg:min-w-[180px]">
                <div className="lg:text-right">
                  <div className="text-base lg:text-lg font-bold text-foreground">{claim.amount}</div>
                  <div className="flex items-center space-x-1 text-xs text-destructive lg:justify-end mt-1">
                    <Clock className="h-3 w-3" />
                    <span>{claim.daysOverdue} giorni di ritardo</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row lg:flex-col space-y-2 sm:space-y-0 sm:space-x-2 lg:space-x-0 lg:space-y-2 w-full lg:w-auto">
                  <Button size="sm" className="flex-1 lg:w-full lg:min-w-[120px]">
                    Gestisci
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 lg:w-full lg:min-w-[120px]"
                    onClick={() => window.location.href = `/claim/${claim.id}`}
                  >
                    Dettagli
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full mt-4">
          Visualizza Tutti i Sinistri in Ritardo
        </Button>
      </CardContent>
    </Card>
  );
};