import { useState, useMemo } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ClientsHeader } from "@/components/clients/ClientsHeader";
import { ClientsGrid } from "@/components/clients/ClientsGrid";
import { ClientsList } from "@/components/clients/ClientsList";

export interface Client {
  id: string;
  nome: string;
  telefono: string;
  email: string;
  indirizzo: string;
  compagnia: string;
  polizza: string;
  sinistri: number;
  ultimoSinistro: string;
  rating: number;
  status: "Attivo" | "In Lavorazione" | "Completato" | "Sospeso";
  provincia: string;
}

export interface ClientsFilters {
  search: string;
  compagnia: string;
  status: string;
  provincia: string;
  rating: string;
}

// Dati mock clienti Campania
const clientiMock: Client[] = [
  {
    id: "CLT001",
    nome: "Giuseppe Esposito", 
    telefono: "+39 328 1234567",
    email: "g.esposito@email.it",
    indirizzo: "Via Toledo 145, 80134 Napoli",
    compagnia: "Generali Italia",
    polizza: "POL/2024/NAP/001234",
    sinistri: 2,
    ultimoSinistro: "15/08/2025",
    rating: 4.8,
    status: "Attivo",
    provincia: "Napoli"
  },
  {
    id: "CLT002",
    nome: "Maria Rossi",
    telefono: "+39 333 9876543", 
    email: "maria.rossi@gmail.com",
    indirizzo: "Corso Umberto I 89, 80138 Napoli",
    compagnia: "Allianz",
    polizza: "AL/2024/147852",
    sinistri: 1,
    ultimoSinistro: "03/08/2025",
    rating: 5.0,
    status: "Attivo",
    provincia: "Napoli"
  },
  {
    id: "CLT003",
    nome: "Antonio De Luca",
    telefono: "+39 347 5551234",
    email: "deluca.antonio@libero.it", 
    indirizzo: "Via Partenope 22, 80121 Napoli",
    compagnia: "UnipolSai",
    polizza: "UNI/2023/789456",
    sinistri: 3,
    ultimoSinistro: "28/07/2025",
    rating: 4.2,
    status: "In Lavorazione",
    provincia: "Napoli"
  },
  {
    id: "CLT004",
    nome: "Francesco Amendola",
    telefono: "+39 349 7778888",
    email: "f.amendola@outlook.it",
    indirizzo: "Via Duomo 15, 84100 Salerno",
    compagnia: "AXA Assicurazioni",
    polizza: "AXA/2024/SA/9988",
    sinistri: 1,
    ultimoSinistro: "20/08/2025",
    rating: 4.5,
    status: "Attivo",
    provincia: "Salerno"
  },
  {
    id: "CLT005",
    nome: "Carmela Russo",
    telefono: "+39 335 4443333",
    email: "c.russo@gmail.com",
    indirizzo: "Corso Trieste 67, 81100 Caserta",
    compagnia: "Generali Italia", 
    polizza: "POL/2024/CE/5567",
    sinistri: 2,
    ultimoSinistro: "12/08/2025",
    rating: 4.9,
    status: "Completato",
    provincia: "Caserta"
  },
  {
    id: "CLT006",
    nome: "Vincenzo Greco",
    telefono: "+39 340 1112233",
    email: "v.greco@libero.it",
    indirizzo: "Via Roma 88, 83100 Avellino", 
    compagnia: "Cattolica Assicurazioni",
    polizza: "CAT/2023/AV/7789",
    sinistri: 1,
    ultimoSinistro: "05/08/2025",
    rating: 4.0,
    status: "In Lavorazione",
    provincia: "Avellino"
  },
  {
    id: "CLT007",
    nome: "Anna Martino",
    telefono: "+39 338 6665544",
    email: "anna.martino@email.it",
    indirizzo: "Piazza Castello 12, 82100 Benevento",
    compagnia: "Reale Mutua",
    polizza: "RM/2024/BN/3344", 
    sinistri: 1,
    ultimoSinistro: "18/08/2025",
    rating: 4.7,
    status: "Attivo",
    provincia: "Benevento"
  },
  {
    id: "CLT008",
    nome: "Roberto Conti",
    telefono: "+39 334 2223344",
    email: "r.conti@gmail.com",
    indirizzo: "Via Mergellina 33, 80122 Napoli",
    compagnia: "Zurich",
    polizza: "ZUR/2024/NAP/556677",
    sinistri: 4,
    ultimoSinistro: "22/08/2025",
    rating: 3.8,
    status: "Sospeso",
    provincia: "Napoli"
  },
  {
    id: "CLT009",
    nome: "Lucia Ferrara",
    telefono: "+39 339 8889999",
    email: "lucia.ferrara@outlook.it",
    indirizzo: "Corso Garibaldi 45, 84121 Salerno",
    compagnia: "Sara Assicurazioni",
    polizza: "SAR/2024/SA/1122",
    sinistri: 1,
    ultimoSinistro: "10/08/2025",
    rating: 4.6,
    status: "Attivo",
    provincia: "Salerno"
  },
  {
    id: "CLT010",
    nome: "Pasquale Romano",
    telefono: "+39 345 7778899",
    email: "p.romano@libero.it",
    indirizzo: "Via Appia 12, 81031 Aversa",
    compagnia: "Linear Assicurazioni",
    polizza: "LIN/2023/CE/9988",
    sinistri: 2,
    ultimoSinistro: "01/08/2025",
    rating: 4.3,
    status: "In Lavorazione",
    provincia: "Caserta"
  }
];

const Clients = () => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ClientsFilters>({
    search: "",
    compagnia: "ALL_COMPANIES",
    status: "ALL_STATUSES",
    provincia: "ALL_PROVINCES",
    rating: "ALL_RATINGS"
  });

  const itemsPerPage = 6;

  const filteredClients = useMemo(() => {
    return clientiMock.filter(client => {
      const matchesSearch = !filters.search || 
        client.nome.toLowerCase().includes(filters.search.toLowerCase()) ||
        client.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        client.telefono.includes(filters.search);

      const matchesCompagnia = filters.compagnia === "ALL_COMPANIES" || client.compagnia === filters.compagnia;
      const matchesStatus = filters.status === "ALL_STATUSES" || client.status === filters.status;
      const matchesProvincia = filters.provincia === "ALL_PROVINCES" || client.provincia === filters.provincia;
      const matchesRating = filters.rating === "ALL_RATINGS" || (() => {
        const ratingFilter = parseFloat(filters.rating);
        return client.rating >= ratingFilter;
      })();

      return matchesSearch && matchesCompagnia && matchesStatus && matchesProvincia && matchesRating;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const compagnies = [...new Set(clientiMock.map(c => c.compagnia))];
  const statuses = [...new Set(clientiMock.map(c => c.status))];
  const provinces = [...new Set(clientiMock.map(c => c.provincia))];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 flex flex-col">
          <ClientsHeader
            viewType={viewType}
            setViewType={setViewType}
            filters={filters}
            setFilters={setFilters}
            totalClients={filteredClients.length}
            compagnies={compagnies}
            statuses={statuses}
            provinces={provinces}
          />
          
          <div className="flex-1 p-4 lg:p-6">
            {viewType === "grid" ? (
              <ClientsGrid 
                clients={paginatedClients}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            ) : (
              <ClientsList 
                clients={paginatedClients}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;