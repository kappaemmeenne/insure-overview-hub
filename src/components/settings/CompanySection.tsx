import { useState } from "react";
import { Building2, Upload, FileText, Euro, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

interface CompanyData {
  nomeStudio: string;
  partitaIva: string;
  codiceFiscale: string;
  indirizzo: string;
  citta: string;
  cap: string;
  provincia: string;
  telefono: string;
  email: string;
  pec: string;
  sito: string;
  tariffaOraria: string;
  tariffaTrasferta: string;
  valutaDefault: string;
}

const templates = [
  { id: "perizia", nome: "Template Perizia", descrizione: "Modello standard per relazioni di perizia" },
  { id: "preventivo", nome: "Template Preventivo", descrizione: "Modello per preventivi e stime" },
  { id: "fattura", nome: "Template Fattura", descrizione: "Modello per fatturazione" },
  { id: "relazione", nome: "Template Relazione", descrizione: "Modello per relazioni tecniche" },
];

export const CompanySection = () => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    nomeStudio: "G Insurance Consulting",
    partitaIva: "12345678901",
    codiceFiscale: "RSSMRC85M15F839Y",
    indirizzo: "Via Toledo 145",
    citta: "Napoli",
    cap: "80134",
    provincia: "NA",
    telefono: "+39 081 1234567",
  email: "info@ginsuranceconsulting.it",
  pec: "gic@pec.ginsuranceconsulting.it",
  sito: "www.ginsuranceconsulting.it",
    tariffaOraria: "80",
    tariffaTrasferta: "0.50",
    valutaDefault: "EUR"
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof CompanyData, value: string) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    toast({
      title: "Dati aziendali aggiornati",
      description: "Le informazioni sono state salvate con successo.",
    });
  };

  const handleLogoUpload = () => {
    // Simula upload logo
    toast({
      title: "Logo caricato",
      description: "Il logo è stato aggiornato con successo.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Company Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Informazioni Studio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo Upload */}
          <div className="space-y-3">
            <Label>Logo Studio</Label>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-secondary rounded-lg flex items-center justify-center">
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" onClick={handleLogoUpload}>
                  <Upload className="h-4 w-4 mr-2" />
                  Carica Logo
                </Button>
                <p className="text-sm text-muted-foreground">
                  PNG, JPG max 2MB - Dimensioni consigliate: 200x200px
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Company Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nomeStudio">Nome Studio</Label>
              <Input
                id="nomeStudio"
                value={companyData.nomeStudio}
                onChange={(e) => handleInputChange("nomeStudio", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="partitaIva">Partita IVA</Label>
              <Input
                id="partitaIva"
                value={companyData.partitaIva}
                onChange={(e) => handleInputChange("partitaIva", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codiceFiscaleStudio">Codice Fiscale</Label>
              <Input
                id="codiceFiscaleStudio"
                value={companyData.codiceFiscale}
                onChange={(e) => handleInputChange("codiceFiscale", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefonoStudio">Telefono Studio</Label>
              <Input
                id="telefonoStudio"
                value={companyData.telefono}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailStudio">Email Studio</Label>
              <Input
                id="emailStudio"
                type="email"
                value={companyData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pec">PEC</Label>
              <Input
                id="pec"
                type="email"
                value={companyData.pec}
                onChange={(e) => handleInputChange("pec", e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="sito">Sito Web</Label>
              <Input
                id="sito"
                value={companyData.sito}
                onChange={(e) => handleInputChange("sito", e.target.value)}
                placeholder="www.tuostudio.it"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h4 className="font-medium">Indirizzo Studio</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="indirizzo">Indirizzo</Label>
                <Input
                  id="indirizzo"
                  value={companyData.indirizzo}
                  onChange={(e) => handleInputChange("indirizzo", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cap">CAP</Label>
                <Input
                  id="cap"
                  value={companyData.cap}
                  onChange={(e) => handleInputChange("cap", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provincia">Provincia</Label>
                <Input
                  id="provincia"
                  value={companyData.provincia}
                  onChange={(e) => handleInputChange("provincia", e.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-4">
                <Label htmlFor="citta">Città</Label>
                <Input
                  id="citta"
                  value={companyData.citta}
                  onChange={(e) => handleInputChange("citta", e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Euro className="h-5 w-5" />
            Tariffario Standard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tariffaOraria">Tariffa Oraria (€)</Label>
              <Input
                id="tariffaOraria"
                type="number"
                value={companyData.tariffaOraria}
                onChange={(e) => handleInputChange("tariffaOraria", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tariffaTrasferta">Trasferta per KM (€)</Label>
              <Input
                id="tariffaTrasferta"
                type="number"
                step="0.01"
                value={companyData.tariffaTrasferta}
                onChange={(e) => handleInputChange("tariffaTrasferta", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valutaDefault">Valuta Default</Label>
              <Input
                id="valutaDefault"
                value={companyData.valutaDefault}
                onChange={(e) => handleInputChange("valutaDefault", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Template Documenti
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {templates.map((template) => (
              <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{template.nome}</h4>
                  <p className="text-sm text-muted-foreground">{template.descrizione}</p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Carica
                  </Button>
                  <Button variant="outline" size="sm">
                    Anteprima
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? "Salvando..." : "Salva Dati Aziendali"}
        </Button>
      </div>
    </div>
  );
};