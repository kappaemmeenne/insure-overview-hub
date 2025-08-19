import { CalendarDays, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const timeFilters = [
  { label: "Oggi", value: "today", active: false },
  { label: "Questa Settimana", value: "week", active: true },
  { label: "Questo Mese", value: "month", active: false },
  { label: "Ultimi 3 Mesi", value: "quarter", active: false },
  { label: "Quest'Anno", value: "year", active: false },
];

export const TimeFilters = () => {
  return (
    <Card className="p-4 bg-secondary/30">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Filtri Temporali</h3>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {timeFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={filter.active ? "default" : "outline"}
              size="sm"
              className="text-xs"
            >
              {filter.label}
            </Button>
          ))}
          
          <Button variant="outline" size="sm" className="ml-2">
            <Filter className="h-4 w-4 mr-1" />
            Filtri Avanzati
          </Button>
        </div>
      </div>
    </Card>
  );
};