import { AlertTriangle, CheckCircle, Clock, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const notifications = [
  {
    id: 1,
    type: "urgent",
    title: "Documentazione in scadenza",
    message: "Il certificato medico per la pratica AUTO-2024-001 scade tra 3 giorni",
    icon: AlertTriangle,
    bgColor: "bg-destructive/10",
    textColor: "text-destructive",
    badgeVariant: "destructive" as const
  },
  {
    id: 2,
    type: "success",
    title: "Pratica approvata",
    message: "La tua richiesta di rimborso CASA-2024-005 è stata approvata",
    icon: CheckCircle,
    bgColor: "bg-success/10",
    textColor: "text-success",
    badgeVariant: "default" as const
  },
  {
    id: 3,
    type: "info",
    title: "Nuovi documenti disponibili",
    message: "È disponibile il riepilogo annuale della tua polizza vita",
    icon: FileText,
    bgColor: "bg-primary/10",
    textColor: "text-primary",
    badgeVariant: "secondary" as const
  }
];

export const NotificationsSection = () => {
  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Notifiche Importanti
          </CardTitle>
          <Badge variant="secondary">{notifications.length} nuove</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.map((notification) => {
          const IconComponent = notification.icon;
          return (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${notification.bgColor} hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full ${notification.bgColor}`}>
                  <IconComponent className={`h-5 w-5 ${notification.textColor}`} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-foreground">
                      {notification.title}
                    </h3>
                    <Badge variant={notification.badgeVariant} className="text-xs">
                      {notification.type === "urgent" ? "Urgente" : 
                       notification.type === "success" ? "Completata" : "Info"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  <Button size="sm" variant="outline" className="text-xs">
                    Visualizza dettagli
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};