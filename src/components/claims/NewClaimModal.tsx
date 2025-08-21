import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export const NewClaimModal = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Sinistro creato",
      description: "Il nuovo sinistro è stato creato con successo.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nuovo Sinistro
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crea Nuovo Sinistro</DialogTitle>
          <DialogDescription>
            Inserisci i dettagli del nuovo sinistro da gestire.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo Sinistro</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rca-auto">RCA Auto</SelectItem>
                  <SelectItem value="furto-auto">Furto Auto</SelectItem>
                  <SelectItem value="incendio">Incendio</SelectItem>
                  <SelectItem value="responsabilita-civile">Responsabilità Civile</SelectItem>
                  <SelectItem value="infortuni">Infortuni</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priorità</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona priorità" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="bassa">Bassa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="client">Cliente</Label>
            <Input id="client" placeholder="Nome e cognome del cliente" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Compagnia Assicurativa</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona compagnia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="generali">Generali Italia</SelectItem>
                <SelectItem value="allianz">Allianz</SelectItem>
                <SelectItem value="axa">AXA Assicurazioni</SelectItem>
                <SelectItem value="unipol">Unipol Sai</SelectItem>
                <SelectItem value="zurich">Zurich Insurance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Importo Stimato</Label>
            <Input id="amount" type="number" placeholder="0.00" min="0" step="0.01" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrizione</Label>
            <Textarea 
              id="description" 
              placeholder="Descrivi brevemente il sinistro..."
              className="min-h-20"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annulla
            </Button>
            <Button type="submit">Crea Sinistro</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};