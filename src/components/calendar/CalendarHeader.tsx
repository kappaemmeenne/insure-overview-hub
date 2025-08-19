import { ChevronLeft, ChevronRight, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { format, addDays, subDays, addWeeks, subWeeks, addMonths, subMonths } from "date-fns";
import { it } from "date-fns/locale";
import type { ViewType, CalendarFilters, AppointmentType, AppointmentStatus, Priority } from "../../pages/Calendar";

interface CalendarHeaderProps {
  viewType: ViewType;
  setViewType: (type: ViewType) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  filters: CalendarFilters;
  setFilters: (filters: CalendarFilters) => void;
  onNewAppointment: () => void;
}

const appointmentTypeLabels: Record<AppointmentType, string> = {
  traditional: "Tradizionale",
  video: "Video",
  specific: "Forma Specifica",
  meeting: "Riunioni/Altro"
};

const statusLabels: Record<AppointmentStatus, string> = {
  planned: "Pianificata",
  "in-progress": "In corso",
  completed: "Completata"
};

const priorityLabels: Record<Priority, string> = {
  urgent: "Urgente",
  normal: "Normale",
  low: "Bassa"
};

export const CalendarHeader = ({
  viewType,
  setViewType,
  selectedDate,
  setSelectedDate,
  filters,
  setFilters,
  onNewAppointment
}: CalendarHeaderProps) => {
  const navigateDate = (direction: "prev" | "next") => {
    if (viewType === "day") {
      setSelectedDate(direction === "next" ? addDays(selectedDate, 1) : subDays(selectedDate, 1));
    } else if (viewType === "week") {
      setSelectedDate(direction === "next" ? addWeeks(selectedDate, 1) : subWeeks(selectedDate, 1));
    } else {
      setSelectedDate(direction === "next" ? addMonths(selectedDate, 1) : subMonths(selectedDate, 1));
    }
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const getDateTitle = () => {
    if (viewType === "day") {
      return format(selectedDate, "EEEE, d MMMM yyyy", { locale: it });
    } else if (viewType === "week") {
      const weekStart = new Date(selectedDate);
      weekStart.setDate(selectedDate.getDate() - selectedDate.getDay() + 1);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return `${format(weekStart, "d MMM", { locale: it })} - ${format(weekEnd, "d MMM yyyy", { locale: it })}`;
    } else {
      return format(selectedDate, "MMMM yyyy", { locale: it });
    }
  };

  const toggleFilter = (
    filterType: keyof CalendarFilters,
    value: any
  ) => {
    const currentFilters = filters[filterType] as any[];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(item => item !== value)
      : [...currentFilters, value];
    
    setFilters({
      ...filters,
      [filterType]: newFilters
    });
  };

  const getActiveFiltersCount = () => {
    return filters.types.length + filters.statuses.length + filters.priorities.length;
  };

  return (
    <div className="bg-card border-b border-border p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-center lg:justify-between">
        {/* Controlli vista e navigazione */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <Select value={viewType} onValueChange={(value: ViewType) => setViewType(value)}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Giorno</SelectItem>
              <SelectItem value="week">Settimana</SelectItem>
              <SelectItem value="month">Mese</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate("prev")}
              className="h-9 w-9"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              onClick={goToToday}
              className="px-4 py-2 text-sm font-medium"
            >
              Oggi
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate("next")}
              className="h-9 w-9"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <h2 className="text-lg font-semibold text-foreground">
            {getDateTitle()}
          </h2>
        </div>

        {/* Filtri e azioni */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="h-4 w-4 mr-2" />
                Filtri
                {getActiveFiltersCount() > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-3">Tipo Perizia</h4>
                  <div className="space-y-2">
                    {Object.entries(appointmentTypeLabels).map(([key, label]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${key}`}
                          checked={filters.types.includes(key as AppointmentType)}
                          onCheckedChange={() => toggleFilter("types", key as AppointmentType)}
                        />
                        <label htmlFor={`type-${key}`} className="text-sm">{label}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-sm mb-3">Stato Pratica</h4>
                  <div className="space-y-2">
                    {Object.entries(statusLabels).map(([key, label]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={`status-${key}`}
                          checked={filters.statuses.includes(key as AppointmentStatus)}
                          onCheckedChange={() => toggleFilter("statuses", key as AppointmentStatus)}
                        />
                        <label htmlFor={`status-${key}`} className="text-sm">{label}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-sm mb-3">Priorità</h4>
                  <div className="space-y-2">
                    {Object.entries(priorityLabels).map(([key, label]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={`priority-${key}`}
                          checked={filters.priorities.includes(key as Priority)}
                          onCheckedChange={() => toggleFilter("priorities", key as Priority)}
                        />
                        <label htmlFor={`priority-${key}`} className="text-sm">{label}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button onClick={onNewAppointment} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Nuovo Appuntamento
          </Button>
        </div>
      </div>
    </div>
  );
};