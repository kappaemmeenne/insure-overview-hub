import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  BarChart3, 
  Eye, 
  MessageCircle,
  FileText,
  Star
} from "lucide-react";
import { ClientsPagination } from "./ClientsPagination";
import type { Client } from "../../pages/Clients";

interface ClientsGridProps {
  clients: Client[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const statusConfig = {
  "Attivo": { color: "bg-success", label: "Attivo" },
  "In Lavorazione": { color: "bg-warning", label: "In Lavorazione" },
  "Completato": { color: "bg-primary", label: "Completato" },
  "Sospeso": { color: "bg-destructive", label: "Sospeso" }
};

const ClientCard = ({ client }: { client: Client }) => {
  const statusInfo = statusConfig[client.status];
  
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < fullStars 
                ? "fill-warning text-warning" 
                : i === fullStars && hasHalfStar
                ? "fill-warning/50 text-warning"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
        <span className="text-sm font-medium ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <Card className="card-hover group">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{client.nome}</h3>
                <p className="text-sm text-muted-foreground">ID: {client.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {renderStars(client.rating)}
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
                <span className="text-xs font-medium">{statusInfo.label}</span>
              </div>
            </div>
          </div>

          {/* Contatti */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{client.telefono}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{client.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{client.indirizzo}</span>
            </div>
          </div>

          {/* Compagnia e Polizza */}
          <div className="flex items-center gap-2 text-sm">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{client.compagnia}</span>
            <span className="text-muted-foreground">-</span>
            <span className="text-muted-foreground">{client.polizza}</span>
          </div>

          {/* Statistiche */}
          <div className="flex items-center gap-2 text-sm">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <span>
              <span className="font-medium">{client.sinistri}</span> Sinistri
            </span>
            <span className="text-muted-foreground">|</span>
            <span>Ultimo: {client.ultimoSinistro}</span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-2 border-t border-border">
            <Button variant="outline" size="sm" className="text-xs">
              <Eye className="h-3 w-3 mr-1" />
              Dettagli
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Phone className="h-3 w-3 mr-1" />
              Chiama
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <MessageCircle className="h-3 w-3 mr-1" />
              Email
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <FileText className="h-3 w-3 mr-1" />
              Pratiche
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ClientsGrid = ({ clients, currentPage, totalPages, onPageChange }: ClientsGridProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {clients.map(client => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>

      {clients.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Nessun cliente trovato</h3>
          <p className="text-muted-foreground">
            Prova a modificare i filtri di ricerca o aggiungi un nuovo cliente.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <ClientsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};