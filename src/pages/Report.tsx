import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ReportHeader } from "@/components/reports/ReportHeader";
import { KPICards } from "@/components/reports/KPICards";
import { TrendChart } from "@/components/reports/TrendChart";
import { GeographicChart } from "@/components/reports/GeographicChart";
import { TypesChart } from "@/components/reports/TypesChart";
import { TimeChart } from "@/components/reports/TimeChart";
import { SatisfactionChart } from "@/components/reports/SatisfactionChart";

export interface ReportFilters {
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  provincia: string;
  tipologie: string[];
  compagnia: string;
}

// Dati mock per report
export const reportData = {
  metriche: {
    sinistri_mese: 68,
    in_lavorazione: 23,
    completati_mese: 45,
    tempo_medio: "5.2 giorni",
    soddisfazione: "94%",
    crescita_sinistri: "+12%",
    performance_tempo: "+0.3 giorni",
    crescita_soddisfazione: "+2%"
  },
  geografico: [
    { provincia: "Napoli", count: 45, percentage: 66.2, color: "#3b82f6" },
    { provincia: "Salerno", count: 12, percentage: 17.6, color: "#10b981" },
    { provincia: "Caserta", count: 6, percentage: 8.8, color: "#f59e0b" },
    { provincia: "Avellino", count: 3, percentage: 4.4, color: "#ef4444" },
    { provincia: "Benevento", count: 2, percentage: 2.9, color: "#8b5cf6" }
  ],
  tipologie: [
    { tipo: "Acqua Condotta", count: 28, importo: "€145,000", color: "#3b82f6" },
    { tipo: "Incendio", count: 22, importo: "€890,000", color: "#ef4444" },
    { tipo: "Furto", count: 12, importo: "€67,000", color: "#f59e0b" },
    { tipo: "Vento", count: 4, importo: "€23,000", color: "#10b981" },
    { tipo: "Altri", count: 2, importo: "€8,500", color: "#6b7280" }
  ],
  trend_mensile: [
    { mese: "Feb", sinistri: 52, completati: 48 },
    { mese: "Mar", sinistri: 61, completati: 55 },
    { mese: "Apr", sinistri: 48, completati: 52 },
    { mese: "Mag", sinistri: 73, completati: 68 },
    { mese: "Giu", sinistri: 59, completati: 61 },
    { mese: "Lug", sinistri: 68, completati: 65 },
    { mese: "Ago", sinistri: 68, completati: 45 }
  ],
  tempo_chiusura: [
    { giorni: "1-2", count: 15 },
    { giorni: "3-4", count: 28 },
    { giorni: "5-6", count: 22 },
    { giorni: "7-8", count: 8 },
    { giorni: "9+", count: 5 }
  ],
  soddisfazione_tempo: [
    { mese: "Feb", rating: 4.2 },
    { mese: "Mar", rating: 4.3 },
    { mese: "Apr", rating: 4.5 },
    { mese: "Mag", rating: 4.4 },
    { mese: "Giu", rating: 4.6 },
    { mese: "Lug", rating: 4.7 },
    { mese: "Ago", rating: 4.8 }
  ]
};

const Report = () => {
  const [filters, setFilters] = useState<ReportFilters>({
    dateFrom: undefined,
    dateTo: undefined,
    provincia: "",
    tipologie: [],
    compagnia: ""
  });

  const province = ["Napoli", "Salerno", "Caserta", "Avellino", "Benevento"];
  const tipologie = ["Acqua Condotta", "Incendio", "Furto", "Vento", "Altri"];
  const compagnies = ["Generali Italia", "Allianz", "UnipolSai", "AXA Assicurazioni", "Cattolica Assicurazioni"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 flex flex-col">
          <ReportHeader
            filters={filters}
            setFilters={setFilters}
            province={province}
            tipologie={tipologie}
            compagnies={compagnies}
          />
          
          <div className="flex-1 p-4 lg:p-6 space-y-6">
            {/* KPI Cards */}
            <KPICards metriche={reportData.metriche} />
            
            {/* Charts Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Trend mensile */}
              <TrendChart data={reportData.trend_mensile} />
              
              {/* Distribuzione geografica */}
              <GeographicChart data={reportData.geografico} />
              
              {/* Tipologie sinistri */}
              <TypesChart data={reportData.tipologie} />
              
              {/* Tempo chiusura */}
              <TimeChart data={reportData.tempo_chiusura} />
            </div>
            
            {/* Satisfaction Chart - Full Width */}
            <SatisfactionChart data={reportData.soddisfazione_tempo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;