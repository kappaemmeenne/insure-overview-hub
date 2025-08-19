import { useState } from "react";
import { Smartphone, Calendar, Mail, MapPin, Link, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface IntegrationSettings {
  whatsappEnabled: boolean;
  whatsappNumber: string;
  calendarEnabled: boolean;
  calendarProvider: string;
  emailProvider: string;
  mapsProvider: string;
}

export const IntegrationsSection = () => {
  const [settings, setSettings] = useState<IntegrationSettings>({
    whatsappEnabled: false,
    whatsappNumber: "+39 329 1234567",
    calendarEnabled: true,
    calendarProvider: "google",
    emailProvider: "gmail",
    mapsProvider: "google"
  });

  const handleToggle = (key: keyof IntegrationSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInputChange = (key: keyof IntegrationSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleConnect = (service: string) => {
    toast({
      title: `${service} connesso`,
      description: "L'integrazione è stata configurata con successo.",
    });
  };

  const integrations = [
    {
      id: "whatsapp",
      title: "WhatsApp Business API",
      description: "Invia messaggi e ricevi notifiche via WhatsApp",
      icon: Smartphone,
      enabled: settings.whatsappEnabled,
      status: settings.whatsappEnabled ? "Attivo" : "Non configurato",
      statusColor: settings.whatsappEnabled ? "success" : "secondary"
    },
    {
      id: "calendar",
      title: "Google Calendar",
      description: "Sincronizza appuntamenti con Google Calendar",
      icon: Calendar,
      enabled: settings.calendarEnabled,
      status: settings.calendarEnabled ? "Sincronizzato" : "Non connesso",
      statusColor: settings.calendarEnabled ? "success" : "secondary"
    },
    {
      id: "email",
      title: "Provider Email",
      description: "Gestisci le email integrate con il sistema",
      icon: Mail,
      enabled: true,
      status: "Configurato",
      statusColor: "success"
    },
    {
      id: "maps",
      title: "Servizio Mappe",
      description: "Integrazione per localizzazione e navigazione",
      icon: MapPin,
      enabled: true,
      status: "Attivo",
      statusColor: "success"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Integrations Overview */}
      <div className="grid gap-4">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-secondary rounded-lg">
                    <integration.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{integration.title}</h3>
                      <Badge 
                        variant={integration.statusColor as any}
                        className="text-xs"
                      >
                        {integration.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {integration.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {integration.id === "whatsapp" && (
                    <Switch
                      checked={settings.whatsappEnabled}
                      onCheckedChange={() => handleToggle("whatsappEnabled")}
                    />
                  )}
                  {integration.id === "calendar" && (
                    <Switch
                      checked={settings.calendarEnabled}
                      onCheckedChange={() => handleToggle("calendarEnabled")}
                    />
                  )}
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configura
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* WhatsApp Configuration */}
      {settings.whatsappEnabled && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Configurazione WhatsApp Business
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">Numero WhatsApp Business</Label>
              <Input
                id="whatsappNumber"
                value={settings.whatsappNumber}
                onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                placeholder="+39 XXX XXXXXXX"
              />
            </div>
            <Button onClick={() => handleConnect("WhatsApp")}>
              <Link className="h-4 w-4 mr-2" />
              Connetti Account
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Email Provider Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Provider Email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emailProvider">Seleziona Provider</Label>
            <Select
              value={settings.emailProvider}
              onValueChange={(value) => handleInputChange("emailProvider", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Scegli provider email" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gmail">Gmail</SelectItem>
                <SelectItem value="outlook">Outlook</SelectItem>
                <SelectItem value="icloud">iCloud</SelectItem>
                <SelectItem value="yahoo">Yahoo Mail</SelectItem>
                <SelectItem value="custom">Server Personalizzato</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {settings.emailProvider === "custom" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Server SMTP</Label>
                <Input placeholder="smtp.example.com" />
              </div>
              <div className="space-y-2">
                <Label>Porta</Label>
                <Input placeholder="587" />
              </div>
              <div className="space-y-2">
                <Label>Username</Label>
                <Input placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Maps Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Servizio Mappe
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mapsProvider">Provider Mappe</Label>
            <Select
              value={settings.mapsProvider}
              onValueChange={(value) => handleInputChange("mapsProvider", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Scegli provider mappe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google">Google Maps</SelectItem>
                <SelectItem value="apple">Apple Maps</SelectItem>
                <SelectItem value="openstreetmap">OpenStreetMap</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {settings.mapsProvider === "google" && (
            <div className="space-y-2">
              <Label>API Key Google Maps</Label>
              <Input placeholder="Inserisci la tua API key" />
              <p className="text-sm text-muted-foreground">
                Necessaria per funzionalità avanzate come routing e geocoding
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};