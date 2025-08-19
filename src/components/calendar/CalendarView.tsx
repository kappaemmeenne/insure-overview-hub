import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format, isSameDay, startOfWeek, endOfWeek, eachDayOfInterval, startOfMonth, endOfMonth, eachWeekOfInterval } from "date-fns";
import { it } from "date-fns/locale";
import { MapPin, Phone, FileText, Clock } from "lucide-react";
import type { ViewType, Appointment, CalendarFilters, AppointmentType } from "../../pages/Calendar";

interface CalendarViewProps {
  viewType: ViewType;
  selectedDate: Date;
  appointments: Appointment[];
  filters: CalendarFilters;
}

const appointmentTypeConfig: Record<AppointmentType, { color: string; emoji: string; bg: string }> = {
  traditional: { color: "text-destructive", emoji: "🔴", bg: "bg-destructive/10 border-destructive/30" },
  video: { color: "text-success", emoji: "🟢", bg: "bg-success/10 border-success/30" },
  specific: { color: "text-warning", emoji: "🟡", bg: "bg-warning/10 border-warning/30" },
  meeting: { color: "text-primary", emoji: "🔵", bg: "bg-primary/10 border-primary/30" }
};

const timeSlots = Array.from({ length: 20 }, (_, i) => {
  const hour = Math.floor(8 + i * 0.5);
  const minutes = (i % 2) * 30;
  return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
});

export const CalendarView = ({ viewType, selectedDate, appointments, filters }: CalendarViewProps) => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const filteredAppointments = appointments.filter(apt => {
    if (filters.types.length > 0 && !filters.types.includes(apt.type)) return false;
    if (filters.statuses.length > 0 && !filters.statuses.includes(apt.status)) return false;
    if (filters.priorities.length > 0 && !filters.priorities.includes(apt.priority)) return false;
    return true;
  });

  const AppointmentCard = ({ appointment, compact = false }: { appointment: Appointment; compact?: boolean }) => {
    const config = appointmentTypeConfig[appointment.type];
    const [isExpanded, setIsExpanded] = useState(false);
    
    if (compact) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Card 
                className={`${config.bg} border cursor-pointer hover:shadow-md transition-all duration-200 p-1`}
                onClick={() => setSelectedAppointment(appointment)}
              >
                <CardContent className="p-0">
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{config.emoji}</span>
                    <span className="text-xs font-medium truncate flex-1">
                      {appointment.startTime}
                    </span>
                    {appointment.priority === "urgent" && (
                      <div className="w-2 h-2 rounded-full bg-destructive" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <div className="p-2 space-y-2">
                <div className="flex items-center gap-2">
                  <span>{config.emoji}</span>
                  <span className="font-medium">{appointment.title}</span>
                </div>
                <div className="text-sm">{appointment.clientName}</div>
                <div className="text-xs text-muted-foreground">{appointment.startTime} - {appointment.endTime}</div>
                <div className="text-xs text-muted-foreground">{appointment.description}</div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <TooltipProvider>
        <Card 
          className={`border cursor-pointer hover:shadow-md transition-all duration-200 ${
            isExpanded 
              ? 'bg-card shadow-lg border-primary/20 p-3' 
              : `${config.bg} p-2`
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <CardContent className="p-0">
            <div className="space-y-2">
              {/* Header sempre visibile */}
              <div className={`flex items-center justify-between ${
                isExpanded ? 'bg-muted/50 -mx-1 px-2 py-1 rounded' : ''
              }`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{config.emoji}</span>
                  <div className="flex flex-col">
                    <span className={`font-medium text-xs ${
                      isExpanded ? 'text-foreground' : 'text-foreground/80'
                    }`}>
                      {appointment.startTime} - {appointment.endTime}
                    </span>
                    <span className={`text-xs truncate ${
                      isExpanded ? 'text-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {appointment.clientName}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {appointment.priority === "urgent" && (
                    <Badge variant="destructive" className="text-xs px-1">!</Badge>
                  )}
                  <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} ${
                    isExpanded ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Dettagli espandibili */}
              {isExpanded && (
                <div className="space-y-2 animate-fade-in bg-background/95 backdrop-blur-sm -mx-1 px-2 py-2 rounded border border-border/50">
                  <div className="text-xs font-medium text-foreground">
                    {appointment.title}
                  </div>
                  <div className="text-xs text-foreground/70">
                    Pratica: {appointment.claimNumber}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-foreground/70">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{appointment.address}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-foreground/70">
                    <Phone className="h-3 w-3" />
                    <span>{appointment.phone}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-foreground/70">
                    <FileText className="h-3 w-3" />
                    <span>{appointment.description}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TooltipProvider>
    );
  };

  const renderDayView = () => {
    const dayAppointments = filteredAppointments.filter(apt => 
      isSameDay(new Date(apt.date), selectedDate)
    );

    return (
      <div className="grid grid-cols-12 gap-2 h-full">
        {/* Colonna orari */}
        <div className="col-span-2">
          {timeSlots.map(time => (
            <div key={time} className="h-16 flex items-center justify-end pr-2 text-xs text-muted-foreground border-b border-border">
              {time}
            </div>
          ))}
        </div>
        
        {/* Colonna appuntamenti */}
        <div className="col-span-10 relative">
          {timeSlots.map(time => (
            <div key={time} className="h-16 border-b border-border" />
          ))}
          
          {/* Appuntamenti compatti */}
          <div className="absolute inset-0">
            {dayAppointments.map((appointment, index) => {
              const startHour = parseInt(appointment.startTime.split(':')[0]);
              const startMinutes = parseInt(appointment.startTime.split(':')[1]);
              const endHour = parseInt(appointment.endTime.split(':')[0]);
              const endMinutes = parseInt(appointment.endTime.split(':')[1]);
              
              const startSlot = (startHour - 8) * 2 + (startMinutes / 30);
              const duration = ((endHour * 60 + endMinutes) - (startHour * 60 + startMinutes)) / 30;
              
              const top = startSlot * 32; // 32px per slot (h-16 / 2)
              const minHeight = 48; // Altezza minima per evitare sovrapposizioni
              const height = Math.max(duration * 32, minHeight);
              
              // Offset per evitare sovrapposizioni
              const offset = index * 2;
              
              return (
                <div
                  key={appointment.id}
                  className="absolute z-10"
                  style={{ 
                    top: `${top + offset}px`, 
                    height: `${height}px`,
                    left: `${8 + offset}px`,
                    right: `${8 + offset}px`
                  }}
                >
                  <AppointmentCard appointment={appointment} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return (
      <div className="h-full">
        {/* Header giorni */}
        <div className="grid grid-cols-8 gap-2 mb-4">
          <div></div>
          {weekDays.map(day => (
            <div key={day.toISOString()} className="text-center p-2 border-b border-border">
              <div className="text-xs text-muted-foreground">
                {format(day, "EEE", { locale: it })}
              </div>
              <div className="font-medium">
                {format(day, "d")}
              </div>
            </div>
          ))}
        </div>
        
        <ScrollArea className="h-96">
          <div className="grid grid-cols-8 gap-2">
            {/* Colonna orari */}
            <div>
              {timeSlots.map(time => (
                <div key={time} className="h-12 flex items-center justify-end pr-2 text-xs text-muted-foreground">
                  {time}
                </div>
              ))}
            </div>
            
            {/* Colonne giorni */}
            {weekDays.map(day => (
              <div key={day.toISOString()} className="space-y-1">
                {timeSlots.map(time => {
                  const dayAppointments = filteredAppointments.filter(apt =>
                    isSameDay(new Date(apt.date), day) &&
                    apt.startTime <= time &&
                    apt.endTime > time
                  );
                  
                  return (
                    <div key={time} className="h-12 border-b border-border">
                      {dayAppointments.map(appointment => (
                        <AppointmentCard 
                          key={appointment.id} 
                          appointment={appointment} 
                          compact 
                        />
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);
    const monthWeeks = eachWeekOfInterval({ 
      start: monthStart, 
      end: monthEnd 
    }, { weekStartsOn: 1 });

    return (
      <div className="h-full">
        {/* Header giorni settimana */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map(day => (
            <div key={day} className="text-center p-2 font-medium text-sm text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        
        {/* Griglia mese */}
        <div className="grid grid-rows-6 gap-2 h-full">
          {monthWeeks.map(weekStart => {
            const weekDays = eachDayOfInterval({
              start: weekStart,
              end: endOfWeek(weekStart, { weekStartsOn: 1 })
            });
            
            return (
              <div key={weekStart.toISOString()} className="grid grid-cols-7 gap-2">
                {weekDays.map(day => {
                  const dayAppointments = filteredAppointments.filter(apt =>
                    isSameDay(new Date(apt.date), day)
                  );
                  
                  return (
                    <Card 
                      key={day.toISOString()} 
                      className={`p-2 h-24 cursor-pointer hover:bg-muted/50 ${
                        isSameDay(day, selectedDate) ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      <CardContent className="p-0 h-full flex flex-col">
                        <div className="font-medium text-sm mb-1">
                          {format(day, "d")}
                        </div>
                        <div className="flex-1 space-y-1 overflow-hidden">
                          {dayAppointments.slice(0, 2).map(appointment => (
                            <div
                              key={appointment.id}
                              className={`text-xs p-1 rounded ${appointmentTypeConfig[appointment.type].bg} truncate`}
                            >
                              {appointmentTypeConfig[appointment.type].emoji} {appointment.startTime}
                            </div>
                          ))}
                          {dayAppointments.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{dayAppointments.length - 2} altri
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full">
      <ScrollArea className="h-full">
        {viewType === "day" && renderDayView()}
        {viewType === "week" && renderWeekView()}
        {viewType === "month" && renderMonthView()}
      </ScrollArea>
    </div>
  );
};