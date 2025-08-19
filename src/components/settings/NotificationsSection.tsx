import { useState } from "react";
import { Bell, Mail, MessageSquare, Smartphone, Calendar, FileText, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

interface NotificationSettings {
  emailNuovoSinistro: boolean;
  smsAppuntamenti: boolean;
  pushNotificheMobile: boolean;
  promemoriScadenze: boolean;
  reportSettimanali: boolean;
  notificheWeekend: boolean;
}

export const NotificationsSection = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNuovoSinistro: true,
    smsAppuntamenti: true,
    pushNotificheMobile: true,
    promemoriScadenze: true,
    reportSettimanali: true,
    notificheWeekend: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    toast({
      title: "Notifiche aggiornate",
      description: "Le preferenze sono state salvate con successo.",
    });
  };

  const notificationItems = [
    {
      key: "emailNuovoSinistro" as keyof NotificationSettings,
      icon: Mail,
      title: "Email Nuovo Sinistro",
      description: "Ricevi una email quando viene assegnato un nuovo sinistro",
      enabled: settings.emailNuovoSinistro
    },
    {
      key: "smsAppuntamenti" as keyof NotificationSettings,
      icon: MessageSquare,
      title: "SMS Appuntamenti",
      description: "Promemoria SMS per gli appuntamenti in programma",
      enabled: settings.smsAppuntamenti
    },
    {
      key: "pushNotificheMobile" as keyof NotificationSettings,
      icon: Smartphone,
      title: "Push Notifiche Mobile",
      description: "Notifiche push sull'app mobile per aggiornamenti importanti",
      enabled: settings.pushNotificheMobile
    },
    {
      key: "promemoriScadenze" as keyof NotificationSettings,
      icon: Calendar,
      title: "Promemoria Scadenze",
      description: "Avvisi per scadenze documenti e pratiche",
      enabled: settings.promemoriScadenze
    },
    {
      key: "reportSettimanali" as keyof NotificationSettings,
      icon: FileText,
      title: "Report Settimanali Automatici",
      description: "Report riassuntivo delle attività della settimana",
      enabled: settings.reportSettimanali
    },
    {
      key: "notificheWeekend" as keyof NotificationSettings,
      icon: Clock,
      title: "Notifiche Weekend",
      description: "Ricevi notifiche anche durante il weekend",
      enabled: settings.notificheWeekend
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Preferenze Notifiche
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {notificationItems.map((item, index) => (
              <div key={item.key}>
                <div className="flex items-start justify-between space-x-4">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="p-2 bg-secondary rounded-lg mt-1">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label 
                        htmlFor={item.key}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {item.title}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    id={item.key}
                    checked={item.enabled}
                    onCheckedChange={() => handleToggle(item.key)}
                  />
                </div>
                {index < notificationItems.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <Separator />
          
          <div className="space-y-4">
            <h4 className="font-medium">Azioni Rapide</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSettings(prev => ({
                    ...prev,
                    emailNuovoSinistro: true,
                    smsAppuntamenti: true,
                    pushNotificheMobile: true,
                    promemoriScadenze: true,
                    reportSettimanali: true,
                  }));
                }}
              >
                Abilita Essenziali
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSettings({
                    emailNuovoSinistro: false,
                    smsAppuntamenti: false,
                    pushNotificheMobile: false,
                    promemoriScadenze: false,
                    reportSettimanali: false,
                    notificheWeekend: false,
                  });
                }}
              >
                Disabilita Tutte
              </Button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salva Preferenze"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};