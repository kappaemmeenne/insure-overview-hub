import { CalendarIcon, Download, Filter, FileText, FileSpreadsheet, FileBarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { cn } from "@/lib/utils";
import type { ReportFilters } from "../../pages/Report";

interface ReportHeaderProps {
  filters: ReportFilters;
  setFilters: (filters: ReportFilters) => void;
  province: string[];
  tipologie: string[];
  compagnies: string[];
}

export const ReportHeader = ({
  filters,
  setFilters,
  province,
  tipologie,
  compagnies
}: ReportHeaderProps) => {
  const activeFiltersCount = [
    filters.dateFrom,
    filters.dateTo,
    filters.provincia,
    filters.compagnia,
    ...filters.tipologie
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFilters({
      dateFrom: undefined,
      dateTo: undefined,
      provincia: "",
      tipologie: [],
      compagnia: ""
    });
  };

  const toggleTipologia = (tipologia: string) => {
    const newTipologie = filters.tipologie.includes(tipologia)
      ? filters.tipologie.filter(t => t !== tipologia)
      : [...filters.tipologie, tipologia];
    
    setFilters({ ...filters, tipologie: newTipologie });
  };

  const exportData = (format: 'pdf' | 'excel' | 'csv') => {
    // Implementare logica di export
    console.log(`Exporting as ${format}`);
  };

  return (
    <div className="bg-card border-b border-border p-4 lg:p-6">
      <div className="flex flex-col gap-4">
        {/* Titolo */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Report</h1>
            <p className="text-sm text-muted-foreground">
              Analisi dettagliata delle performance e metriche
            </p>
          </div>
          
          {/* Export buttons */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hidden sm:flex">
                <Download className="h-4 w-4 mr-2" />
                Esporta
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => exportData('pdf')}>
                <FileText className="h-4 w-4 mr-2" />
                Esporta PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportData('excel')}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Esporta Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportData('csv')}>
                <FileBarChart className="h-4 w-4 mr-2" />
                Esporta CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Filtri */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
          {/* Date Range */}
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !filters.dateFrom && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateFrom ? format(filters.dateFrom, "PPP", { locale: it }) : "Data inizio"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.dateFrom}
                  onSelect={(date) => setFilters({ ...filters, dateFrom: date })}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            <span className="text-muted-foreground">-</span>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !filters.dateTo && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateTo ? format(filters.dateTo, "PPP", { locale: it }) : "Data fine"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.dateTo}
                  onSelect={(date) => setFilters({ ...filters, dateTo: date })}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Altri filtri */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Provincia */}
            <Select 
              value={filters.provincia} 
              onValueChange={(value) => setFilters({ ...filters, provincia: value })}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Provincia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tutte le province</SelectItem>
                {province.map(prov => (
                  <SelectItem key={prov} value={prov}>{prov}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Compagnia */}
            <Select 
              value={filters.compagnia} 
              onValueChange={(value) => setFilters({ ...filters, compagnia: value })}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Compagnia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tutte le compagnie</SelectItem>
                {compagnies.map(comp => (
                  <SelectItem key={comp} value={comp}>{comp}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Filtri avanzati */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="relative">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtri
                  {activeFiltersCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Filtri Avanzati</h4>
                    {activeFiltersCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        Pulisci
                      </Button>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <label className="text-sm font-medium mb-3 block">Tipologie Sinistro</label>
                    <div className="space-y-2">
                      {tipologie.map(tipo => (
                        <div key={tipo} className="flex items-center space-x-2">
                          <Checkbox
                            id={tipo}
                            checked={filters.tipologie.includes(tipo)}
                            onCheckedChange={() => toggleTipologia(tipo)}
                          />
                          <label htmlFor={tipo} className="text-sm cursor-pointer">
                            {tipo}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Filtri attivi */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.dateFrom && (
              <Badge variant="secondary">
                Da: {format(filters.dateFrom, "dd/MM/yyyy")}
              </Badge>
            )}
            {filters.dateTo && (
              <Badge variant="secondary">
                A: {format(filters.dateTo, "dd/MM/yyyy")}
              </Badge>
            )}
            {filters.provincia && (
              <Badge variant="secondary">
                {filters.provincia}
              </Badge>
            )}
            {filters.compagnia && (
              <Badge variant="secondary">
                {filters.compagnia}
              </Badge>
            )}
            {filters.tipologie.map(tipo => (
              <Badge key={tipo} variant="secondary">
                {tipo}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};