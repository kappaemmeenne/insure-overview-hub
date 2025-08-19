import { useState } from "react";
import { Database, Download, Upload, Cloud, HardDrive, Calendar, FileSpreadsheet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

interface BackupSettings {
  autoBackupEnabled: boolean;
  backupFrequency: string;
  cloudProvider: string;
  includeDocuments: boolean;
  includeImages: boolean;
  retentionDays: string;
}

const backupHistory = [
  {
    id: "1",
    date: "Oggi, 02:00",
    type: "Automatico",
    size: "156 MB",
    status: "completed",
    items: "2,847 records"
  },
  {
    id: "2", 
    date: "Ieri, 02:00",
    type: "Automatico",
    size: "154 MB",
    status: "completed",
    items: "2,831 records"
  },
  {
    id: "3",
    date: "2 giorni fa, 14:30",
    type: "Manuale",
    size: "158 MB", 
    status: "completed",
    items: "2,847 records"
  },
  {
    id: "4",
    date: "3 giorni fa, 02:00",
    type: "Automatico",
    size: "152 MB",
    status: "failed",
    items: "0 records"
  }
];

export const BackupSection = () => {
  const [settings, setSettings] = useState<BackupSettings>({
    autoBackupEnabled: true,
    backupFrequency: "daily",
    cloudProvider: "google_drive",
    includeDocuments: true,
    includeImages: false,
    retentionDays: "30"
  });
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);

  const handleToggle = (key: keyof BackupSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectChange = (key: keyof BackupSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleManualBackup = async () => {
    setIsBackingUp(true);
    setBackupProgress(0);

    // Simula progresso backup
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          toast({
            title: "Backup completato",
            description: "Tutti i dati sono stati salvati con successo.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleExportData = (format: "json" | "excel" | "csv") => {
    toast({
      title: "Export avviato",
      description: `I dati verranno esportati in formato ${format.toUpperCase()}.`,
    });
  };

  const handleImportData = () => {
    toast({
      title: "Import avviato",
      description: "Seleziona il file da importare.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Backup Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Impostazioni Backup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Backup Automatico</Label>
              <p className="text-sm text-muted-foreground">
                Esegui automaticamente il backup dei dati
              </p>
            </div>
            <Switch
              checked={settings.autoBackupEnabled}
              onCheckedChange={() => handleToggle("autoBackupEnabled")}
            />
          </div>

          {settings.autoBackupEnabled && (
            <div className="space-y-4 p-4 bg-secondary/30 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Frequenza Backup</Label>
                  <Select
                    value={settings.backupFrequency}
                    onValueChange={(value) => handleSelectChange("backupFrequency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Ogni ora</SelectItem>
                      <SelectItem value="daily">Giornaliero</SelectItem>
                      <SelectItem value="weekly">Settimanale</SelectItem>
                      <SelectItem value="monthly">Mensile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Conservazione (giorni)</Label>
                  <Select
                    value={settings.retentionDays}
                    onValueChange={(value) => handleSelectChange("retentionDays", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 giorni</SelectItem>
                      <SelectItem value="30">30 giorni</SelectItem>
                      <SelectItem value="90">90 giorni</SelectItem>
                      <SelectItem value="365">1 anno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Contenuto Backup</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="includeDocuments"
                      checked={settings.includeDocuments}
                      onCheckedChange={() => handleToggle("includeDocuments")}
                    />
                    <Label htmlFor="includeDocuments" className="cursor-pointer">
                      Includi documenti e allegati
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="includeImages"
                      checked={settings.includeImages}
                      onCheckedChange={() => handleToggle("includeImages")}
                    />
                    <Label htmlFor="includeImages" className="cursor-pointer">
                      Includi immagini e foto
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cloud Storage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Sincronizzazione Cloud
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Provider Cloud</Label>
            <Select
              value={settings.cloudProvider}
              onValueChange={(value) => handleSelectChange("cloudProvider", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google_drive">Google Drive</SelectItem>
                <SelectItem value="dropbox">Dropbox</SelectItem>
                <SelectItem value="onedrive">Microsoft OneDrive</SelectItem>
                <SelectItem value="icloud">iCloud</SelectItem>
                <SelectItem value="none">Nessuno</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {settings.cloudProvider !== "none" && (
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Cloud className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">
                    {settings.cloudProvider === "google_drive" && "Google Drive"}
                    {settings.cloudProvider === "dropbox" && "Dropbox"}
                    {settings.cloudProvider === "onedrive" && "OneDrive"}
                    {settings.cloudProvider === "icloud" && "iCloud"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Connesso • Ultimo sync: 2 ore fa
                  </p>
                </div>
              </div>
              <Badge variant="default">Attivo</Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Manual Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            Azioni Manuali
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isBackingUp && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Backup in corso...</span>
                <span className="text-sm text-muted-foreground">{backupProgress}%</span>
              </div>
              <Progress value={backupProgress} className="w-full" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={handleManualBackup} 
              disabled={isBackingUp}
              className="w-full"
            >
              <Database className="h-4 w-4 mr-2" />
              {isBackingUp ? "Backup in corso..." : "Backup Manuale"}
            </Button>

            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Ripristina Backup
            </Button>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Esporta Dati</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExportData("json")}
              >
                <Download className="h-4 w-4 mr-2" />
                JSON
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExportData("excel")}
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Excel
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExportData("csv")}
              >
                <Download className="h-4 w-4 mr-2" />
                CSV
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Importa da Excel</h4>
            <Button variant="outline" onClick={handleImportData}>
              <Upload className="h-4 w-4 mr-2" />
              Seleziona File Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Backup History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Cronologia Backup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {backupHistory.map((backup) => (
            <div key={backup.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{backup.date}</span>
                  <Badge variant="outline" className="text-xs">
                    {backup.type}
                  </Badge>
                  <Badge 
                    variant={backup.status === "completed" ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {backup.status === "completed" ? "Completato" : "Fallito"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {backup.size} • {backup.items}
                </p>
              </div>
              <div className="space-x-2">
                {backup.status === "completed" && (
                  <>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Scarica
                    </Button>
                    <Button variant="outline" size="sm">
                      Ripristina
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};