import { Clock, MapPin, User, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

export const UrgentClaims = () => {
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
          <div key={claim.id} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-foreground">{claim.id}</span>
                  <Badge 
                    variant={claim.priority === "Alta" ? "destructive" : "secondary"}
                    className="text-xs"
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
                
                <div className="mt-2 text-sm">
                  <span className="text-muted-foreground">Tipo: </span>
                  <span className="font-medium text-foreground">{claim.type}</span>
                </div>
              </div>
              
              <div className="text-right space-y-2">
                <div className="text-lg font-bold text-foreground">{claim.amount}</div>
                <div className="flex items-center space-x-1 text-xs text-destructive">
                  <Clock className="h-3 w-3" />
                  <span>{claim.daysOverdue} giorni di ritardo</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button size="sm" className="flex-1">
                Gestisci
              </Button>
              <Button size="sm" variant="outline">
                Dettagli
              </Button>
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