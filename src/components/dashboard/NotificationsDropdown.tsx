import { Bell, Clock, AlertTriangle, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockNotifications = [
  {
    id: 1,
    type: "urgent",
    title: "Sinistro in scadenza",
    message: "Il sinistro #25473 scade oggi",
    time: "5 min fa",
    icon: AlertTriangle,
    color: "text-destructive"
  },
  {
    id: 2,
    type: "appointment",
    title: "Appuntamento oggi",
    message: "Sopralluogo alle 14:30 con Mario Rossi",
    time: "2 ore fa",
    icon: Calendar,
    color: "text-primary"
  },
  {
    id: 3,
    type: "completed",
    title: "Sinistro completato",
    message: "Il sinistro #25470 è stato chiuso con successo",
    time: "1 giorno fa",
    icon: CheckCircle,
    color: "text-green-600"
  },
  {
    id: 4,
    type: "update",
    title: "Aggiornamento pratica",
    message: "Nuovi documenti caricati per il sinistro #25471",
    time: "2 giorni fa",
    icon: Clock,
    color: "text-blue-600"
  },
  {
    id: 5,
    type: "urgent",
    title: "Documentazione mancante",
    message: "Richiesti documenti aggiuntivi per sinistro #25469",
    time: "3 giorni fa",
    icon: AlertTriangle,
    color: "text-orange-600"
  }
];

export const NotificationsDropdown = () => {
  const unreadCount = mockNotifications.filter(n => n.id <= 3).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          Notifiche
          <Badge variant="secondary" className="text-xs">
            {unreadCount} nuove
          </Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-80">
          {mockNotifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <DropdownMenuItem key={notification.id} className="flex items-start gap-3 p-3 cursor-pointer">
                <div className={`mt-0.5 ${notification.color}`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
                {notification.id <= 3 && (
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                )}
              </DropdownMenuItem>
            );
          })}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center text-sm text-primary">
          Visualizza tutte le notifiche
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};