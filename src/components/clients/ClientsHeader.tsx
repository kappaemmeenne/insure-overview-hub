import { Search, Filter, Grid, List, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import type { ClientsFilters } from "../../pages/Clients";

interface ClientsHeaderProps {
  viewType: "grid" | "list";
  setViewType: (type: "grid" | "list") => void;
  filters: ClientsFilters;
  setFilters: (filters: ClientsFilters) => void;
  totalClients: number;
  compagnies: string[];
  statuses: string[];
  provinces: string[];
}

export const ClientsHeader = ({
  viewType,
  setViewType,
  filters,
  setFilters,
  totalClients,
  compagnies,
  statuses,
  provinces
}: ClientsHeaderProps) => {
  const activeFiltersCount = Object.values(filters).filter(value => value !== "").length - (filters.search ? 1 : 0);

  const clearFilters = () => {
    setFilters({
      search: filters.search, // Mantieni la ricerca
      compagnia: "",
      status: "",
      provincia: "",
      rating: ""
    });
  };

  return (
    <div className="bg-card border-b border-border p-4 lg:p-6">
      <div className="flex flex-col gap-4">
        {/* Titolo e contatore */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Clienti</h1>
            <p className="text-sm text-muted-foreground">
              {totalClients} {totalClients === 1 ? 'cliente trovato' : 'clienti trovati'}
            </p>
          </div>
          
          <Button className="hidden sm:flex">
            <Plus className="h-4 w-4 mr-2" />
            Nuovo Cliente
          </Button>
        </div>

        {/* Barra di ricerca e controlli */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca per nome, email o telefono..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pl-10"
            />
          </div>

          {/* Controlli vista e filtri */}
          <div className="flex items-center gap-2">
            {/* Toggle vista */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewType === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewType("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewType === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewType("list")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Filtri */}
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
                    <h4 className="font-medium">Filtri</h4>
                    {activeFiltersCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        Pulisci
                      </Button>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Compagnia</label>
                      <Select 
                        value={filters.compagnia} 
                        onValueChange={(value) => setFilters({ ...filters, compagnia: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Tutte le compagnie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Tutte le compagnie</SelectItem>
                          {compagnies.map(compagnia => (
                            <SelectItem key={compagnia} value={compagnia}>
                              {compagnia}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Status</label>
                      <Select 
                        value={filters.status} 
                        onValueChange={(value) => setFilters({ ...filters, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Tutti gli status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Tutti gli status</SelectItem>
                          {statuses.map(status => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Provincia</label>
                      <Select 
                        value={filters.provincia} 
                        onValueChange={(value) => setFilters({ ...filters, provincia: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Tutte le province" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Tutte le province</SelectItem>
                          {provinces.map(provincia => (
                            <SelectItem key={provincia} value={provincia}>
                              {provincia}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Rating minimo</label>
                      <Select 
                        value={filters.rating} 
                        onValueChange={(value) => setFilters({ ...filters, rating: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Tutti i rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Tutti i rating</SelectItem>
                          <SelectItem value="4.5">4.5+ stelle</SelectItem>
                          <SelectItem value="4.0">4.0+ stelle</SelectItem>
                          <SelectItem value="3.5">3.5+ stelle</SelectItem>
                          <SelectItem value="3.0">3.0+ stelle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};