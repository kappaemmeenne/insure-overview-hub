import type { TimeFilter } from "@/pages/Index";

export const applicaFiltroTemporale = (periodo: TimeFilter): { dataInizio: Date; dataFine: Date } => {
  const oggi = new Date();
  let dataInizio: Date;
  
  switch(periodo) {
    case 'today':
      dataInizio = new Date(oggi.getFullYear(), oggi.getMonth(), oggi.getDate());
      break;
    case 'week':
      const dayOfWeek = oggi.getDay();
      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Se domenica, torna indietro di 6 giorni
      dataInizio = new Date(oggi);
      dataInizio.setDate(oggi.getDate() + mondayOffset);
      dataInizio.setHours(0, 0, 0, 0);
      break;
    case 'month': 
      dataInizio = new Date(oggi.getFullYear(), oggi.getMonth(), 1);
      break;
    case 'quarter':
      dataInizio = new Date(oggi);
      dataInizio.setMonth(oggi.getMonth() - 3);
      dataInizio.setDate(1);
      dataInizio.setHours(0, 0, 0, 0);
      break;
    case 'year':
      dataInizio = new Date(oggi.getFullYear(), 0, 1);
      break;
    default:
      dataInizio = new Date(oggi.getFullYear(), oggi.getMonth(), 1);
  }
  
  return {
    dataInizio,
    dataFine: new Date() // Oggi come data fine
  };
};

export const formatDateRange = (timeFilter: TimeFilter): string => {
  const { dataInizio, dataFine } = applicaFiltroTemporale(timeFilter);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  return `${formatDate(dataInizio)} - ${formatDate(dataFine)}`;
};