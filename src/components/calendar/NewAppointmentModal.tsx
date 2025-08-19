import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, MapPin, User, FileText } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
}

const appointmentTypes = [
  { id: "traditional", label: "Perizia Tradizionale", emoji: "🔴" },
  { id: "video", label: "Videoperizia", emoji: "🟢" },
  { id: "specific", label: "Forma Specifica", emoji: "🟡" },
  { id: "meeting", label: "Riunioni/Altro", emoji: "🔵" }
];

const durations = [
  { value: "30", label: "30 minuti" },
  { value: "60", label: "1 ora" },
  { value: "120", label: "2 ore" },
  { value: "180", label: "3 ore" }
];

const timeSlots = Array.from({ length: 20 }, (_, i) => {
  const hour = Math.floor(8 + i * 0.5);
  const minutes = (i % 2) * 30;
  return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
});

const documentsList = [
  "Denuncia di sinistro",
  "Documentazione fotografica",
  "Preventivi di riparazione",
  "Perizia medica",
  "Verbale di incidente",
  "Documenti identità",
  "Libretto circolazione",
  "Polizza assicurativa"
];

export const NewAppointmentModal = ({ isOpen, onClose, selectedDate }: NewAppointmentModalProps) => {
  const [date, setDate] = useState<Date>(selectedDate);
  const [formData, setFormData] = useState({
    clientName: "",
    clientSearch: "",
    appointmentType: "",
    startTime: "",
    duration: "60",
    address: "",
    notes: "",
    documents: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Qui implementare la logica di salvataggio
    console.log("Nuovo appuntamento:", { ...formData, date });
    onClose();
  };

  const handleDocumentToggle = (document: string) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.includes(document)
        ? prev.documents.filter(d => d !== document)
        : [...prev.documents, document]
    }));
  };

  const calculateEndTime = (startTime: string, duration: string) => {
    if (!startTime || !duration) return "";
    
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + parseInt(duration);
    const endHours = Math.floor(totalMinutes / 60);
    const endMins = totalMinutes % 60;
    
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nuovo Appuntamento</DialogTitle>
          <DialogDescription>
            Compila i dettagli per creare un nuovo appuntamento
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cliente */}
          <div className="space-y-4">
            <Label className="text-base font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Cliente
            </Label>
            <Input
              placeholder="Cerca cliente o inserisci nuovo nome..."
              value={formData.clientSearch}
              onChange={(e) => setFormData(prev => ({ ...prev, clientSearch: e.target.value }))}
            />
          </div>

          {/* Data e Ora */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Data
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: it }) : <span>Seleziona data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Orario
              </Label>
              <Select 
                value={formData.startTime} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, startTime: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona orario" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Durata */}
          <div className="space-y-2">
            <Label>Durata</Label>
            <Select 
              value={formData.duration} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {durations.map(duration => (
                  <SelectItem key={duration.value} value={duration.value}>
                    {duration.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.startTime && (
              <p className="text-sm text-muted-foreground">
                Termine previsto: {calculateEndTime(formData.startTime, formData.duration)}
              </p>
            )}
          </div>

          {/* Tipo Perizia */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Tipo Perizia</Label>
            <RadioGroup 
              value={formData.appointmentType} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, appointmentType: value }))}
              className="grid grid-cols-2 gap-4"
            >
              {appointmentTypes.map(type => (
                <div key={type.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={type.id} id={type.id} />
                  <Label htmlFor={type.id} className="flex items-center gap-2 cursor-pointer">
                    <span>{type.emoji}</span>
                    {type.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Indirizzo */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Indirizzo
            </Label>
            <Input
              placeholder="Via, Numero Civico, Città"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            />
          </div>

          {/* Note */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Note
            </Label>
            <Textarea
              placeholder="Dettagli specifici, richieste particolari..."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="min-h-20"
            />
          </div>

          {/* Documenti */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Documenti da portare</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {documentsList.map(document => (
                <div key={document} className="flex items-center space-x-2">
                  <Checkbox
                    id={document}
                    checked={formData.documents.includes(document)}
                    onCheckedChange={() => handleDocumentToggle(document)}
                  />
                  <Label htmlFor={document} className="text-sm cursor-pointer">
                    {document}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Azioni */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annulla
            </Button>
            <Button type="submit" className="flex-1">
              Crea Appuntamento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};