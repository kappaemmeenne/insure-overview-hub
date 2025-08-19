import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, User, FileText, Calendar, MapPin, Euro, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ClaimDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data per il sinistro - in un'app reale verrebbe da un'API
  const claimData = {
    id: id || "25473",
    status: "Aperto",
    company: "Generali Italia S.p.A.",
    division: "Generali Italia S.p.A.",
    agency: "INT NAPOLI SUD",
    number: "0058N720010015444154",
    type: "Resp. civile RCA - guasto",
    accidentDate: "13/08/2025",
    contractor: "CONDOMINIO VIA GIULIO CESARE 267",
    reference: "Riferimento Contraente",
    policy: "44/854719",
    policyType: "Danni elementi di coproprieta",
    grade: "Semplice",
    location: "GIULIO CESARE 267",
    city: "NAPOLI",
    province: "Napoli",
    cap: "80123",
    denunciation: "14/08/2025",
    calculation: "gg/mm/aaaa",
    opening: "15/08/2025",
    result: "gg/mm/aaaa",
    correction: "gg/mm/aaaa",
    closing: "gg/mm/aaaa",
    broker: "Broker della polizza",
    brokerRef: "Riferimento Broker",
    administrator: "Gianpaolo Gioma",
    liquidator: "Liquidatore"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/")}
                className="hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Sinistro {claimData.id}
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary">{claimData.status}</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Stampa
              </Button>
              <Button size="sm">
                Salva Modifiche
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Intestazione sinistro */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Intestazione sinistro</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Il sinistro ha una configurazione con un iniziamo elementi; richiedere trattamento.
            </p>
            <div className="text-sm">
              <span className="font-medium">Sistema n. </span>
              <span>{claimData.number} del {claimData.accidentDate} a politico Elementi Italia S.p.A. n. {claimData.policy} - CONDOMINIO VIA GIULIO CESARE 267 SI {claimData.id}</span>
            </div>
          </CardContent>
        </Card>

        {/* Compagnie */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Compagnie</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Compagnia</Label>
                <Input value={claimData.company} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Divisione</Label>
                <Input value={claimData.division} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Agenzia</Label>
                <Input value={claimData.agency} readOnly className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sinistro */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Sinistro</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Numero</Label>
                <Input value={claimData.number} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Tipo</Label>
                <Input value={claimData.type} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Accadimento</Label>
                <Input value={claimData.accidentDate} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Riferimento</Label>
                <Input value={claimData.reference} readOnly className="mt-1" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Contraente</Label>
                <Input value={claimData.contractor} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Riferimento Assicurato</Label>
                <Input value="Riferimento Assicurato" readOnly className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Polizza</Label>
                <Input value={claimData.policy} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Tipo Polizza</Label>
                <Input value={claimData.policyType} readOnly className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Grado</Label>
                <Input value={claimData.grade} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Luogo</Label>
                <Input value={claimData.location} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Città</Label>
                <Input value={claimData.city} readOnly className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Provincia</Label>
                <Input value={claimData.province} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">CAP</Label>
                <Input value={claimData.cap} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Denuncia</Label>
                <Input value={claimData.denunciation} readOnly className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Denuncia</Label>
                <Input value={claimData.denunciation} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Calcolo</Label>
                <Input value={claimData.calculation} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Apertura</Label>
                <Input value={claimData.opening} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Risultazione</Label>
                <Input value={claimData.result} readOnly className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Correzione</Label>
                <Input value={claimData.correction} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Chiusura</Label>
                <Input value={claimData.closing} readOnly className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Broker</Label>
                <Input value={claimData.broker} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Riferimento Broker</Label>
                <Input value={claimData.brokerRef} readOnly className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Amministratore</Label>
                <Input value={claimData.administrator} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Liquidatore</Label>
                <Input value={claimData.liquidator} readOnly className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sezioni espandibili */}
        <Accordion type="multiple" className="space-y-4">
          <AccordionItem value="danneggiati" className="border border-border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span className="font-medium">Danneggiati</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Tipo: Soggetto</span>
                    <Button size="sm" variant="outline">+</Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Vista da 1 a 1 di 1 elementi
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="referenti" className="border border-border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span className="font-medium">Referenti</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Ruolo</span>
                    <Button size="sm" variant="outline">+</Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Vista da 2 a 6 di 6 elementi
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="assegnazione" className="border border-border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span className="font-medium">Assegnazione</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <p className="text-sm text-muted-foreground">
                Sezione assegnazione vuota
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="perizia" className="border border-border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span className="font-medium">Perizia</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <p className="text-sm text-muted-foreground">
                Sezione perizia vuota
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="consulenti" className="border border-border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span className="font-medium">Consulenti</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <p className="text-sm text-muted-foreground">
                Sezione consulenti vuota
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="allegati" className="border border-border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span className="font-medium">Allegati</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Documenti Interni</Button>
                  <Button variant="outline" size="sm">Documenti Compagnia</Button>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <Button size="sm" className="w-full">
                    Carica documenti interni
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Vista da 1 a 4 di 4 elementi
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}