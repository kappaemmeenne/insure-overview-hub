import { CalendarDays, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdvancedFiltersModal, type AdvancedFilters } from "./AdvancedFiltersModal";
import { formatDateRange } from "@/utils/dateFilters";
import type { TimeFilter } from "@/pages/Index";

interface TimeFiltersProps {
  activeFilter: TimeFilter;
  onFilterChange: (filter: TimeFilter) => void;
  advancedFilters: AdvancedFilters;
  onAdvancedFiltersChange: (filters: AdvancedFilters) => void;
}

const timeFilters = [
  { label: "Oggi", value: "today" as TimeFilter },
  { label: "Questa Settimana", value: "week" as TimeFilter },
  { label: "Questo Mese", value: "month" as TimeFilter },
  { label: "Ultimi 3 Mesi", value: "quarter" as TimeFilter },
  { label: "Quest'Anno", value: "year" as TimeFilter },
];

export const TimeFilters = ({ 
  activeFilter, 
  onFilterChange, 
  advancedFilters, 
  onAdvancedFiltersChange 
}: TimeFiltersProps) => {
  const hasAdvancedFilters = Object.values(advancedFilters).some(value => 
    Array.isArray(value) ? value.length > 0 : 
    value !== undefined && value !== "" && value !== 0 && value !== 1000000
  );

  return (
    <Card className="p-4 bg-secondary/30">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Filtri Temporali</h3>
          <Badge variant="outline" className="text-xs">
            {formatDateRange(activeFilter)}
          </Badge>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {timeFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => onFilterChange(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
          
          <AdvancedFiltersModal
            filters={advancedFilters}
            onFiltersChange={onAdvancedFiltersChange}
          >
            <Button variant="outline" size="sm" className="ml-2 relative">
              <Filter className="h-4 w-4 mr-1" />
              Filtri Avanzati
              {hasAdvancedFilters && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  !
                </Badge>
              )}
            </Button>
          </AdvancedFiltersModal>
        </div>
      </div>
    </Card>
  );
};