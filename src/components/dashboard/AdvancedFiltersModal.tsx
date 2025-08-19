import { useState } from "react";
import { CalendarIcon, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { cn } from "@/lib/utils";

export interface AdvancedFilters {
  dateFrom?: Date;
  dateTo?: Date;
  statuses: string[];
  compagnies: string[];
  tipologie: string[];
  importoMin: number;
  importoMax: number;
  ratingMin: number;
}

interface AdvancedFiltersModalProps {
  filters: AdvancedFilters;
  onFiltersChange: (filters: AdvancedFilters) => void;
  children: React.ReactNode;
}

const statusOptions = [
  { value: "pending", label: "In Attesa" },
  { value: "in_progress", label: "In Lavorazione" },
  { value: "completed", label: "Completati" },
  { value: "cancelled", label: "Annullati" }
];

const compagnies = [
  "Generali Italia", "Allianz", "UnipolSai", "AXA Assicurazioni",
  "Cattolica Assicurazioni", "Reale Mutua", "Zurich", "Poste Italiane"
];

const tipologie = [
  "Acqua Condotta", "Incendio", "Furto", "Vento", "Grandine",
  "Scoppio", "Cristalli", "Eventi Sociopolitici", "Altri"
];

export const AdvancedFiltersModal = ({ filters, onFiltersChange, children }: AdvancedFiltersModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<AdvancedFilters>(filters);

  const handleApply = () => {
    onFiltersChange(localFilters);
    setIsOpen(false);
  };

  const handleReset = () => {
    const resetFilters: AdvancedFilters = {
      dateFrom: undefined,
      dateTo: undefined,
      statuses: [],
      compagnies: [],
      tipologie: [],
      importoMin: 0,
      importoMax: 1000000,
      ratingMin: 0
    };
    setLocalFilters(resetFilters);
  };

  const toggleStatus = (status: string) => {
    const newStatuses = localFilters.statuses.includes(status)
      ? localFilters.statuses.filter(s => s !== status)
      : [...localFilters.statuses, status];
    setLocalFilters({ ...localFilters, statuses: newStatuses });
  };

  const toggleCompagnia = (compagnia: string) => {
    const newCompagnies = localFilters.compagnies.includes(compagnia)
      ? localFilters.compagnies.filter(c => c !== compagnia)
      : [...localFilters.compagnies, compagnia];
    setLocalFilters({ ...localFilters, compagnies: newCompagnies });
  };

  const toggleTipologia = (tipologia: string) => {
    const newTipologie = localFilters.tipologie.includes(tipologia)
      ? localFilters.tipologie.filter(t => t !== tipologia)
      : [...localFilters.tipologie, tipologia];
    setLocalFilters({ ...localFilters, tipologie: newTipologie });
  };

  const activeFiltersCount = [
    localFilters.dateFrom,
    localFilters.dateTo,
    ...localFilters.statuses,
    ...localFilters.compagnies,
    ...localFilters.tipologie,
    localFilters.importoMin > 0 ? "importoMin" : null,
    localFilters.importoMax < 1000000 ? "importoMax" : null,
    localFilters.ratingMin > 0 ? "ratingMin" : null
  ].filter(Boolean).length;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Filtri Avanzati</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount} filtri attivi
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Range Date */}
          <div className="space-y-4">
            <h4 className="font-medium">Periodo</h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Data Inizio</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !localFilters.dateFrom && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {localFilters.dateFrom ? format(localFilters.dateFrom, "PPP", { locale: it }) : "Seleziona data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={localFilters.dateFrom}
                      onSelect={(date) => setLocalFilters({ ...localFilters, dateFrom: date })}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Data Fine</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !localFilters.dateTo && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {localFilters.dateTo ? format(localFilters.dateTo, "PPP", { locale: it }) : "Seleziona data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={localFilters.dateTo}
                      onSelect={(date) => setLocalFilters({ ...localFilters, dateTo: date })}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h4 className="font-medium">Status Sinistri</h4>
            <div className="space-y-2">
              {statusOptions.map(status => (
                <div key={status.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={status.value}
                    checked={localFilters.statuses.includes(status.value)}
                    onCheckedChange={() => toggleStatus(status.value)}
                  />
                  <label htmlFor={status.value} className="text-sm cursor-pointer">
                    {status.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Compagnie */}
          <div className="space-y-4">
            <h4 className="font-medium">Compagnie</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {compagnies.map(compagnia => (
                <div key={compagnia} className="flex items-center space-x-2">
                  <Checkbox
                    id={compagnia}
                    checked={localFilters.compagnies.includes(compagnia)}
                    onCheckedChange={() => toggleCompagnia(compagnia)}
                  />
                  <label htmlFor={compagnia} className="text-sm cursor-pointer">
                    {compagnia}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Tipologie */}
          <div className="space-y-4">
            <h4 className="font-medium">Tipologie Sinistro</h4>
            <div className="space-y-2">
              {tipologie.map(tipologia => (
                <div key={tipologia} className="flex items-center space-x-2">
                  <Checkbox
                    id={tipologia}
                    checked={localFilters.tipologie.includes(tipologia)}
                    onCheckedChange={() => toggleTipologia(tipologia)}
                  />
                  <label htmlFor={tipologia} className="text-sm cursor-pointer">
                    {tipologia}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Range Importi */}
          <div className="space-y-4">
            <h4 className="font-medium">Range Importi</h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Importo Minimo: €{localFilters.importoMin.toLocaleString()}
                </label>
                <Slider
                  value={[localFilters.importoMin]}
                  onValueChange={([value]) => setLocalFilters({ ...localFilters, importoMin: value })}
                  max={100000}
                  step={1000}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Importo Massimo: €{localFilters.importoMax.toLocaleString()}
                </label>
                <Slider
                  value={[localFilters.importoMax]}
                  onValueChange={([value]) => setLocalFilters({ ...localFilters, importoMax: value })}
                  min={10000}
                  max={1000000}
                  step={5000}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Rating Minimo */}
          <div className="space-y-4">
            <h4 className="font-medium">Rating Cliente Minimo</h4>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Rating: {localFilters.ratingMin} stelle
              </label>
              <Slider
                value={[localFilters.ratingMin]}
                onValueChange={([value]) => setLocalFilters({ ...localFilters, ratingMin: value })}
                max={5}
                step={0.5}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            Azzera Filtri
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleApply}>
              Applica Filtri
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};