import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Phone, Mail, Calendar, MapPin } from "lucide-react";
import { format, isSameDay } from "date-fns";
import { it } from "date-fns/locale";
import type { Appointment } from "../../pages/Calendar";

interface CalendarSidebarProps {
  selectedDate: Date;
  appointments: Appointment[];
  onNewAppointment: () => void;
}

const appointmentTypeConfig = {
  traditional: { emoji: "🔴", label: "Tradizionale" },
  video: { emoji: "🟢", label: "Video" },
  specific: { emoji: "🟡", label: "Forma Specifica" },
  meeting: { emoji: "🔵", label: "Riunioni/Altro" }
};

const statusConfig = {
  planned: { label: "Pianificata", variant: "secondary" as const },
  "in-progress": { label: "In corso", variant: "default" as const },
  completed: { label: "Completata", variant: "outline" as const }
};

const priorityConfig = {
  urgent: { label: "Urgente", variant: "destructive" as const },
  normal: { label: "Normale", variant: "secondary" as const },
  low: { label: "Bassa", variant: "outline" as const }
};

export const CalendarSidebar = ({ selectedDate, appointments, onNewAppointment }: CalendarSidebarProps) => {
  const dayAppointments = appointments.filter(apt => 
    isSameDay(new Date(apt.date), selectedDate)
  );

  const totalHours = dayAppointments.reduce((acc, apt) => {
    const start = new Date(`2000-01-01T${apt.startTime}`);
    const end = new Date(`2000-01-01T${apt.endTime}`);
    return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  }, 0);

  const estimatedKm = dayAppointments.length * 25; // Stima 25km per appuntamento

  return (
    <div className="h-full p-4 space-y-6 bg-card">
      {/* Header giorno selezionato */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            {format(selectedDate, "EEEE, d MMMM", { locale: it })}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Appuntamenti</span>
              <div className="font-semibold">{dayAppointments.length}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Ore impegnate</span>
              <div className="font-semibold">{totalHours.toFixed(1)}h</div>
            </div>
            <div>
              <span className="text-muted-foreground">Km stimati</span>
              <div className="font-semibold">{estimatedKm} km</div>
            </div>
            <div>
              <span className="text-muted-foreground">Efficienza</span>
              <div className="font-semibold">
                {dayAppointments.length > 0 ? Math.round((dayAppointments.filter(a => a.status === "completed").length / dayAppointments.length) * 100) : 0}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista appuntamenti giornata */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Appuntamenti del giorno</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {dayAppointments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nessun appuntamento per oggi
            </p>
          ) : (
            dayAppointments
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map(appointment => (
                <div key={appointment.id} className="space-y-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{appointmentTypeConfig[appointment.type].emoji}</span>
                      <span className="font-medium text-sm">{appointment.startTime}</span>
                    </div>
                    <div className="flex gap-1">
                      <Badge variant={statusConfig[appointment.status].variant} className="text-xs">
                        {statusConfig[appointment.status].label}
                      </Badge>
                      <Badge variant={priorityConfig[appointment.priority].variant} className="text-xs">
                        {priorityConfig[appointment.priority].label}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="font-medium text-sm">{appointment.clientName}</div>
                    <div className="text-xs text-muted-foreground">{appointment.claimNumber}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{appointment.address}</span>
                    </div>
                  </div>
                </div>
              ))
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button onClick={onNewAppointment} className="w-full justify-start">
            <Plus className="h-4 w-4 mr-2" />
            Nuovo Appuntamento
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Phone className="h-4 w-4 mr-2" />
            Chiama Cliente
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Mail className="h-4 w-4 mr-2" />
            Invia Promemoria
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Calendar className="h-4 w-4 mr-2" />
            Sposta Appuntamento
          </Button>
        </CardContent>
      </Card>

      {/* Note giornaliere */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Note Giornaliere</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="Aggiungi note per questa giornata..."
            className="min-h-20 resize-none"
          />
          <Button size="sm" className="mt-2 w-full">
            Salva Note
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};