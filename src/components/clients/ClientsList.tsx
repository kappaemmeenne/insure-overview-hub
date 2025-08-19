import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Phone, 
  Mail, 
  Eye, 
  MessageCircle,
  FileText,
  Star,
  MapPin
} from "lucide-react";
import { ClientsPagination } from "./ClientsPagination";
import type { Client } from "../../pages/Clients";

interface ClientsListProps {
  clients: Client[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const statusConfig = {
  "Attivo": { variant: "default" as const, color: "bg-success" },
  "In Lavorazione": { variant: "secondary" as const, color: "bg-warning" },
  "Completato": { variant: "outline" as const, color: "bg-primary" },
  "Sospeso": { variant: "destructive" as const, color: "bg-destructive" }
};

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

export const ClientsList = ({ clients, currentPage, totalPages, onPageChange }: ClientsListProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="border border-border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Contatti</TableHead>
              <TableHead>Compagnia</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Sinistri</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map(client => (
              <TableRow key={client.id} className="group hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {getInitials(client.nome)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{client.nome}</div>
                      <div className="text-sm text-muted-foreground">{client.id}</div>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3" />
                      <span>{client.telefono}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="h-3 w-3" />
                      <span className="truncate max-w-40">{client.email}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate max-w-40">{client.provincia}</span>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div>
                    <div className="font-medium text-sm">{client.compagnia}</div>
                    <div className="text-xs text-muted-foreground">{client.polizza}</div>
                  </div>
                </TableCell>
                
                <TableCell>
                  {renderStars(client.rating)}
                </TableCell>
                
                <TableCell>
                  <div>
                    <div className="font-medium">{client.sinistri}</div>
                    <div className="text-xs text-muted-foreground">
                      Ultimo: {client.ultimoSinistro}
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${statusConfig[client.status].color}`} />
                    <Badge variant={statusConfig[client.status].variant} className="text-xs">
                      {client.status}
                    </Badge>
                  </div>
                </TableCell>
                
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {clients.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>
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