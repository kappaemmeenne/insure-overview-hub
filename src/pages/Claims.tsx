import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Eye, Edit, Calendar, Clock, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { NewClaimModal } from "@/components/claims/NewClaimModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data per i sinistri
const mockClaims = [
  {
    id: "25473",
    type: "RCA Auto",
    client: "Mario Rossi",
    company: "Generali Italia",
    status: "In Lavorazione",
    priority: "Alta",
    amount: "€ 15.450",
    date: "15/08/2025",
    dueDate: "22/08/2025",
    daysOverdue: 0,
    assignee: "Marco Bianchi"
  },
  {
    id: "25472",
    type: "Furto Auto",
    client: "Laura Verdi",
    company: "Allianz",
    status: "In Attesa",
    priority: "Media",
    amount: "€ 8.200",
    date: "12/08/2025",
    dueDate: "19/08/2025",
    daysOverdue: 3,
    assignee: "Anna Rossi"
  },
  {
    id: "25471",
    type: "Incendio Casa",
    client: "Giuseppe Neri",
    company: "Axa Assicurazioni",
    status: "Completato",
    priority: "Bassa",
    amount: "€ 32.100",
    date: "10/08/2025",
    dueDate: "17/08/2025",
    daysOverdue: 0,
    assignee: "Marco Bianchi"
  },
  {
    id: "25470",
    type: "RCA Moto",
    client: "Francesca Blu",
    company: "Generali Italia",
    status: "In Ritardo",
    priority: "Alta",
    amount: "€ 5.800",
    date: "08/08/2025",
    dueDate: "15/08/2025",
    daysOverdue: 7,
    assignee: "Giuseppe Verdi"
  },
  {
    id: "25469",
    type: "Danni Acqua",
    client: "Roberto Gialli",
    company: "Zurich",
    status: "Annullato",
    priority: "Media",
    amount: "€ 12.750",
    date: "05/08/2025",
    dueDate: "12/08/2025",
    daysOverdue: 0,
    assignee: "Anna Rossi"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "In Attesa":
      return <Clock className="h-4 w-4" />;
    case "In Lavorazione":
      return <AlertTriangle className="h-4 w-4" />;
    case "Completato":
      return <CheckCircle className="h-4 w-4" />;
    case "Annullato":
      return <XCircle className="h-4 w-4" />;
    case "In Ritardo":
      return <Clock className="h-4 w-4 text-destructive" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "In Attesa":
      return "secondary";
    case "In Lavorazione":
      return "default";
    case "Completato":
      return "secondary";
    case "Annullato":
      return "destructive";
    case "In Ritardo":
      return "destructive";
    default:
      return "secondary";
  }
};

const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case "Alta":
      return "destructive";
    case "Media":
      return "secondary";
    case "Bassa":
      return "outline";
    default:
      return "secondary";
  }
};

export default function Claims() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  // Filtra i sinistri in base ai criteri selezionati
  const filteredClaims = mockClaims.filter((claim) => {
    const matchesSearch = 
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || claim.priority === priorityFilter;
    
    const matchesTab = activeTab === "all" || 
      (activeTab === "urgent" && (claim.priority === "Alta" || claim.daysOverdue > 0)) ||
      (activeTab === "overdue" && claim.daysOverdue > 0) ||
      (activeTab === "completed" && claim.status === "Completato");

    return matchesSearch && matchesStatus && matchesPriority && matchesTab;
  });

  const handleClaimClick = (claimId: string) => {
    navigate(`/claim/${claimId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        {/* Sidebar nascosta su mobile, visibile da lg in poi */}
        <div className="hidden lg:block lg:fixed lg:inset-y-0 lg:top-16 lg:w-64 lg:z-10">
          <Sidebar />
        </div>
        
        {/* Contenuto principale */}
        <div className="flex-1 lg:ml-64">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">Gestione Sinistri</h1>
              <p className="text-muted-foreground">Visualizza e gestisci tutti i sinistri assegnati</p>
            </div>

            {/* Filtri e ricerca */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filtri e Ricerca</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Cerca per ID, cliente, tipo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Stato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tutti gli stati</SelectItem>
                      <SelectItem value="In Attesa">In Attesa</SelectItem>
                      <SelectItem value="In Lavorazione">In Lavorazione</SelectItem>
                      <SelectItem value="Completato">Completato</SelectItem>
                      <SelectItem value="In Ritardo">In Ritardo</SelectItem>
                      <SelectItem value="Annullato">Annullato</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Priorità" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tutte le priorità</SelectItem>
                      <SelectItem value="Alta">Alta</SelectItem>
                      <SelectItem value="Media">Media</SelectItem>
                      <SelectItem value="Bassa">Bassa</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setPriorityFilter("all");
                      setActiveTab("all");
                    }}
                    className="w-full"
                  >
                    Resetta Filtri
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabs per visualizzazioni rapide */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                <TabsTrigger value="all">Tutti</TabsTrigger>
                <TabsTrigger value="urgent">Urgenti</TabsTrigger>
                <TabsTrigger value="overdue">In Ritardo</TabsTrigger>
                <TabsTrigger value="completed">Completati</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Tabella sinistri */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <CardTitle>
                    Sinistri ({filteredClaims.length})
                  </CardTitle>
                  <div className="flex gap-2">
                    <NewClaimModal />
                    <Button size="sm" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Esporta
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead className="hidden sm:table-cell">Cliente</TableHead>
                        <TableHead className="hidden md:table-cell">Compagnia</TableHead>
                        <TableHead>Stato</TableHead>
                        <TableHead className="hidden lg:table-cell">Priorità</TableHead>
                        <TableHead>Importo</TableHead>
                        <TableHead className="hidden xl:table-cell">Assegnato a</TableHead>
                        <TableHead>Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClaims.map((claim) => (
                        <TableRow 
                          key={claim.id} 
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleClaimClick(claim.id)}
                        >
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span>{claim.id}</span>
                              {claim.daysOverdue > 0 && (
                                <span className="text-xs text-destructive">
                                  {claim.daysOverdue} giorni di ritardo
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-32 truncate" title={claim.type}>
                              {claim.type}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div className="max-w-32 truncate" title={claim.client}>
                              {claim.client}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="max-w-32 truncate" title={claim.company}>
                              {claim.company}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(claim.status)} className="flex items-center space-x-1 w-fit">
                              {getStatusIcon(claim.status)}
                              <span className="hidden sm:inline">{claim.status}</span>
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <Badge variant={getPriorityVariant(claim.priority)}>
                              {claim.priority}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            {claim.amount}
                          </TableCell>
                          <TableCell className="hidden xl:table-cell">
                            <div className="max-w-32 truncate" title={claim.assignee}>
                              {claim.assignee}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleClaimClick(claim.id);
                                }}
                                className="h-8 w-8 p-0"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Logica per editing
                                }}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {filteredClaims.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Nessun sinistro trovato con i criteri selezionati.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}