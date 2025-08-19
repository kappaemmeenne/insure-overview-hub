import { useState } from "react";
import { Palette, Globe, Clock, Calendar, DollarSign, Moon, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface InterfaceSettings {
  darkMode: boolean;
  language: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  currencySymbol: string;
}

export const InterfaceSection = () => {
  const [settings, setSettings] = useState<InterfaceSettings>({
    darkMode: false,
    language: "it",
    timezone: "Europe/Rome",
    dateFormat: "DD/MM/YYYY",
    currency: "EUR",
    currencySymbol: "€"
  });

  const handleToggle = (key: keyof InterfaceSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectChange = (key: keyof InterfaceSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Interfaccia aggiornata",
      description: "Le preferenze sono state salvate con successo.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Theme */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Tema e Aspetto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Tema Scuro</Label>
              <p className="text-sm text-muted-foreground">
                Attiva il tema scuro per un'esperienza visiva più confortevole
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={settings.darkMode}
                onCheckedChange={() => handleToggle("darkMode")}
              />
              <Moon className="h-4 w-4" />
            </div>
          </div>

          {/* Theme Preview */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg border-2 ${!settings.darkMode ? 'border-primary' : 'border-border'}`}>
              <div className="bg-white rounded p-3 space-y-2">
                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                <div className="h-6 bg-blue-500 rounded w-1/3"></div>
              </div>
              <p className="text-center text-sm mt-2">Tema Chiaro</p>
            </div>
            <div className={`p-4 rounded-lg border-2 ${settings.darkMode ? 'border-primary' : 'border-border'}`}>
              <div className="bg-gray-900 rounded p-3 space-y-2">
                <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                <div className="h-2 bg-gray-800 rounded w-1/2"></div>
                <div className="h-6 bg-blue-400 rounded w-1/3"></div>
              </div>
              <p className="text-center text-sm mt-2">Tema Scuro</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language & Localization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Lingua e Localizzazione
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Lingua Interfaccia</Label>
              <Select
                value={settings.language}
                onValueChange={(value) => handleSelectChange("language", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">🇮🇹 Italiano</SelectItem>
                  <SelectItem value="en">🇬🇧 English</SelectItem>
                  <SelectItem value="fr">🇫🇷 Français</SelectItem>
                  <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                  <SelectItem value="es">🇪🇸 Español</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Fuso Orario</Label>
              <Select
                value={settings.timezone}
                onValueChange={(value) => handleSelectChange("timezone", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Rome">Europe/Rome (GMT+1)</SelectItem>
                  <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                  <SelectItem value="Europe/Paris">Europe/Paris (GMT+1)</SelectItem>
                  <SelectItem value="Europe/Berlin">Europe/Berlin (GMT+1)</SelectItem>
                  <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date & Currency Format */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Formati Data e Valuta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateFormat">Formato Data</Label>
              <Select
                value={settings.dateFormat}
                onValueChange={(value) => handleSelectChange("dateFormat", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY (31/12/2025)</SelectItem>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY (12/31/2025)</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (2025-12-31)</SelectItem>
                  <SelectItem value="DD-MM-YYYY">DD-MM-YYYY (31-12-2025)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Valuta</Label>
              <Select
                value={settings.currency}
                onValueChange={(value) => handleSelectChange("currency", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR - Euro (€)</SelectItem>
                  <SelectItem value="USD">USD - Dollaro US ($)</SelectItem>
                  <SelectItem value="GBP">GBP - Sterlina (£)</SelectItem>
                  <SelectItem value="CHF">CHF - Franco Svizzero (CHF)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Format Preview */}
          <div className="p-4 bg-secondary/30 rounded-lg">
            <h4 className="font-medium mb-2">Anteprima Formattazione</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Data: </span>
                <span className="font-mono">
                  {settings.dateFormat === "DD/MM/YYYY" && "31/12/2025"}
                  {settings.dateFormat === "MM/DD/YYYY" && "12/31/2025"}
                  {settings.dateFormat === "YYYY-MM-DD" && "2025-12-31"}
                  {settings.dateFormat === "DD-MM-YYYY" && "31-12-2025"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Valuta: </span>
                <span className="font-mono">
                  {settings.currency === "EUR" && "€1.234,56"}
                  {settings.currency === "USD" && "$1,234.56"}
                  {settings.currency === "GBP" && "£1,234.56"}
                  {settings.currency === "CHF" && "CHF 1'234.56"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          Salva Preferenze Interfaccia
        </Button>
      </div>
    </div>
  );
};