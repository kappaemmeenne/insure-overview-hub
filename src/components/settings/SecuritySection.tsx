import { useState } from "react";
import { Shield, Key, Smartphone, Monitor, Eye, EyeOff, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

const mockSessions: Session[] = [
  {
    id: "1",
    device: "Chrome su Windows",
    location: "Napoli, Italia",
    lastActive: "Ora",
    current: true
  },
  {
    id: "2",
    device: "Safari su iPhone",
    location: "Napoli, Italia",
    lastActive: "2 ore fa",
    current: false
  },
  {
    id: "3",
    device: "Chrome su Android",
    location: "Milano, Italia",
    lastActive: "1 giorno fa",
    current: false
  }
];

const loginHistory = [
  { date: "Oggi, 14:32", location: "Napoli, Italia", device: "Chrome su Windows", status: "success" },
  { date: "Ieri, 09:15", location: "Napoli, Italia", device: "Safari su iPhone", status: "success" },
  { date: "2 giorni fa, 16:45", location: "Milano, Italia", device: "Chrome su Android", status: "success" },
  { date: "3 giorni fa, 11:22", location: "Roma, Italia", device: "Firefox su Windows", status: "failed" },
];

export const SecuritySection = () => {
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [gdprConsents, setGdprConsents] = useState({
    dataProcessing: true,
    marketing: false,
    analytics: true,
    cookies: true
  });

  const handlePasswordChange = (field: keyof PasswordForm, value: string) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordSubmit = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Errore",
        description: "Le password non coincidono.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Password aggiornata",
      description: "La password è stata cambiata con successo.",
    });

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSessionRevoke = (sessionId: string) => {
    toast({
      title: "Sessione terminata",
      description: "La sessione è stata revocata con successo.",
    });
  };

  const handleConsentChange = (consent: keyof typeof gdprConsents) => {
    setGdprConsents(prev => ({ ...prev, [consent]: !prev[consent] }));
  };

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Cambio Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Password Attuale</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPasswords.current ? "text" : "password"}
                value={passwordForm.currentPassword}
                onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                placeholder="Inserisci password attuale"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility("current")}
              >
                {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">Nuova Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPasswords.new ? "text" : "password"}
                value={passwordForm.newPassword}
                onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                placeholder="Inserisci nuova password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility("new")}
              >
                {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Conferma Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showPasswords.confirm ? "text" : "password"}
                value={passwordForm.confirmPassword}
                onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                placeholder="Conferma nuova password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility("confirm")}
              >
                {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button onClick={handlePasswordSubmit} className="w-full">
            Aggiorna Password
          </Button>
        </CardContent>
      </Card>

      {/* Two Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Autenticazione a Due Fattori (2FA)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Abilita 2FA</Label>
              <p className="text-sm text-muted-foreground">
                Aggiungi un livello extra di sicurezza al tuo account
              </p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>

          {twoFactorEnabled && (
            <div className="space-y-4 p-4 bg-secondary/30 rounded-lg">
              <p className="text-sm">
                Configura l'app di autenticazione sul tuo dispositivo mobile:
              </p>
              <div className="space-y-2">
                <Button variant="outline" size="sm">
                  📱 Configura con Google Authenticator
                </Button>
                <Button variant="outline" size="sm">
                  🔐 Configura con Authy
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Sessioni Attive
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{session.device}</span>
                  {session.current && (
                    <Badge variant="default" className="text-xs">Attuale</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{session.location}</p>
                <p className="text-xs text-muted-foreground">Ultimo accesso: {session.lastActive}</p>
              </div>
              {!session.current && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleSessionRevoke(session.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Revoca
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Login History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Cronologia Accessi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loginHistory.map((login, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{login.date}</span>
                  <Badge 
                    variant={login.status === "success" ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {login.status === "success" ? "Successo" : "Fallito"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{login.device}</p>
                <p className="text-xs text-muted-foreground">{login.location}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* GDPR Consents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Consensi GDPR
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="dataProcessing"
                checked={gdprConsents.dataProcessing}
                onCheckedChange={() => handleConsentChange("dataProcessing")}
              />
              <div className="space-y-1">
                <Label htmlFor="dataProcessing" className="cursor-pointer">
                  Trattamento Dati Personali (Obbligatorio)
                </Label>
                <p className="text-sm text-muted-foreground">
                  Consenso al trattamento dei dati personali per la fornitura del servizio
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="marketing"
                checked={gdprConsents.marketing}
                onCheckedChange={() => handleConsentChange("marketing")}
              />
              <div className="space-y-1">
                <Label htmlFor="marketing" className="cursor-pointer">
                  Comunicazioni Marketing
                </Label>
                <p className="text-sm text-muted-foreground">
                  Ricevi comunicazioni promozionali e newsletter
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="analytics"
                checked={gdprConsents.analytics}
                onCheckedChange={() => handleConsentChange("analytics")}
              />
              <div className="space-y-1">
                <Label htmlFor="analytics" className="cursor-pointer">
                  Analisi e Statistiche
                </Label>
                <p className="text-sm text-muted-foreground">
                  Utilizzo dei dati per migliorare il servizio
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="cookies"
                checked={gdprConsents.cookies}
                onCheckedChange={() => handleConsentChange("cookies")}
              />
              <div className="space-y-1">
                <Label htmlFor="cookies" className="cursor-pointer">
                  Cookie Tecnici
                </Label>
                <p className="text-sm text-muted-foreground">
                  Cookie necessari per il funzionamento del sito
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>Diritti dell'interessato:</strong> Hai il diritto di accedere, 
              rettificare, cancellare i tuoi dati personali e di opporti al loro trattamento.
            </p>
            <p>
              Per esercitare i tuoi diritti contatta: privacy@studiorossi.it
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};