import { FileText, Clock, CheckCircle, AlertCircle, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const pratiche = [
  {
    id: "AUTO-2024-001",
    title: "Sinistro Auto - Incidente stradale",
    description: "Via Roma, 15 - Milano",
    status: "in_progress",
    statusText: "In Lavorazione",
    date: "2024-01-10",
    amount: "€ 2.500,00",
    icon: FileText,
    color: "primary"
  },
  {
    id: "CASA-2024-005",
    title: "Rimborso Danni Casa - Infiltrazioni",
    description: "Appartamento Via Garibaldi, 8",
    status: "completed",
    statusText: "Completata",
    date: "2024-01-05",
    amount: "€ 1.200,00",
    icon: CheckCircle,
    color: "success"
  },
  {
    id: "VITA-2024-002",
    title: "Aggiornamento Polizza Vita",
    description: "Modifica beneficiario",
    status: "pending",
    statusText: "In Attesa Documenti",
    date: "2024-01-12",
    amount: "-",
    icon: Clock,
    color: "warning"
  },
  {
    id: "AUTO-2024-003",
    title: "Preventivo Assicurazione Auto",
    description: "BMW Serie 3 - 2023",
    status: "pending",
    statusText: "In Attesa Conferma",
    date: "2024-01-15",
    amount: "€ 680,00/anno",
    icon: AlertCircle,
    color: "warning"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-success text-success-foreground">Completata</Badge>;
    case "in_progress":
      return <Badge className="bg-primary text-primary-foreground">In Corso</Badge>;
    case "pending":
      return <Badge className="bg-warning text-warning-foreground">In Attesa</Badge>;
    default:
      return <Badge variant="secondary">Sconosciuto</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-5 w-5 text-success" />;
    case "in_progress":
      return <Clock className="h-5 w-5 text-primary" />;
    case "pending":
      return <AlertCircle className="h-5 w-5 text-warning" />;
    default:
      return <FileText className="h-5 w-5 text-muted-foreground" />;
  }
};

export const PratichesSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <FileText className="h-5 w-5 text-primary" />
          Status Pratiche Assicurative
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pratiche.map((pratica) => (
            <div
              key={pratica.id}
              className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 rounded-full bg-muted">
                    {getStatusIcon(pratica.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {pratica.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          ID: {pratica.id}
                        </p>
                      </div>
                      {getStatusBadge(pratica.status)}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {pratica.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>Data: {new Date(pratica.date).toLocaleDateString('it-IT')}</span>
                        <span>Importo: {pratica.amount}</span>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Eye className="h-3 w-3 mr-1" />
                        Visualizza Dettagli
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline" className="w-full">
            Visualizza Tutte le Pratiche
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};