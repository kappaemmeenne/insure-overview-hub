import { useState } from "react";
import { User, Camera, Save, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const profiloPerito = {
  nome: "Marco",
  cognome: "Rossi", 
  email: "marco.rossi@perito.it",
  telefono: "+39 329 1234567",
  codiceFiscale: "RSSMRC85M15F839Y",
  numeroAlbo: "PE/NA/2157",
  specializzazioni: ["Incendio", "Acqua Condotta", "Danni da Vento"],
  esperienza: "15 anni",
  bio: "Perito assicurativo specializzato in sinistri di natura meteorologica e incendio. Esperienza consolidata nel settore con particolare focus su perizie auto e immobili."
};

export const ProfileSection = () => {
  const [profile, setProfile] = useState(profiloPerito);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simula chiamata API
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    toast({
      title: "Profilo aggiornato",
      description: "Le modifiche sono state salvate con successo.",
    });
  };

  const handleReset = () => {
    setProfile(profiloPerito);
    toast({
      title: "Modifiche annullate",
      description: "Il profilo è stato ripristinato.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informazioni Personali
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" />
              <AvatarFallback className="text-lg">
                {profile.nome[0]}{profile.cognome[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-2" />
                Cambia Foto
              </Button>
              <p className="text-sm text-muted-foreground">
                JPG, PNG max 2MB
              </p>
            </div>
          </div>

          <Separator />

          {/* Personal Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={profile.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                placeholder="Nome"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cognome">Cognome</Label>
              <Input
                id="cognome"
                value={profile.cognome}
                onChange={(e) => handleInputChange("cognome", e.target.value)}
                placeholder="Cognome"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Telefono</Label>
              <Input
                id="telefono"
                value={profile.telefono}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
                placeholder="Telefono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codiceFiscale">Codice Fiscale</Label>
              <Input
                id="codiceFiscale"
                value={profile.codiceFiscale}
                onChange={(e) => handleInputChange("codiceFiscale", e.target.value)}
                placeholder="Codice Fiscale"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numeroAlbo">Numero Albo</Label>
              <Input
                id="numeroAlbo"
                value={profile.numeroAlbo}
                onChange={(e) => handleInputChange("numeroAlbo", e.target.value)}
                placeholder="Numero Albo"
              />
            </div>
          </div>

          {/* Specializations */}
          <div className="space-y-3">
            <Label>Specializzazioni</Label>
            <div className="flex flex-wrap gap-2">
              {profile.specializzazioni.map((spec, index) => (
                <Badge key={index} variant="secondary">
                  {spec}
                </Badge>
              ))}
              <Button variant="outline" size="sm">
                + Aggiungi
              </Button>
            </div>
          </div>

          {/* Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="esperienza">Anni di Esperienza</Label>
              <Input
                id="esperienza"
                value={profile.esperienza}
                onChange={(e) => handleInputChange("esperienza", e.target.value)}
                placeholder="Anni di esperienza"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Biografia Professionale</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              placeholder="Descrivi la tua esperienza professionale..."
              rows={4}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Salvando..." : "Salva Profilo"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};