import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CalendarMetrics } from "@/components/calendar/CalendarMetrics";
import { CalendarView } from "@/components/calendar/CalendarView";
import { CalendarSidebar } from "@/components/calendar/CalendarSidebar";
import { NewAppointmentModal } from "@/components/calendar/NewAppointmentModal";

export type ViewType = "day" | "week" | "month";
export type AppointmentType = "traditional" | "video" | "specific" | "meeting";
export type AppointmentStatus = "planned" | "in-progress" | "completed";
export type Priority = "urgent" | "normal" | "low";

export interface Appointment {
  id: string;
  title: string;
  type: AppointmentType;
  status: AppointmentStatus;
  priority: Priority;
  startTime: string;
  endTime: string;
  date: Date;
  clientName: string;
  clientCode: string;
  claimNumber: string;
  address: string;
  phone: string;
  description: string;
  documents?: string[];
  notes?: string;
}

export interface CalendarFilters {
  types: AppointmentType[];
  statuses: AppointmentStatus[];
  priorities: Priority[];
}

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState<ViewType>("day");
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [filters, setFilters] = useState<CalendarFilters>({
    types: [],
    statuses: [],
    priorities: []
  });

  // Mock data per gli appuntamenti
  const [appointments] = useState<Appointment[]>([
    {
      id: "1",
      title: "Perizia Tradizionale",
      type: "traditional",
      status: "planned",
      priority: "urgent",
      startTime: "09:30",
      endTime: "11:00",
      date: new Date(),
      clientName: "Mario Rossi",
      clientCode: "RSSMR85C15F205Y",
      claimNumber: "2025/INC/001234",
      address: "Via Roma 15, Napoli",
      phone: "+39 333 1234567",
      description: "Incendio - Appartamento",
      documents: ["Denuncia", "Foto", "Preventivi"]
    },
    {
      id: "2",
      title: "Videoperizia",
      type: "video",
      status: "in-progress",
      priority: "normal",
      startTime: "14:00",
      endTime: "15:30",
      date: new Date(),
      clientName: "Giulia Bianchi",
      clientCode: "BNCGLI90A41H501Z",
      claimNumber: "2025/AUT/005678",
      address: "Via Milano 22, Roma",
      phone: "+39 338 9876543",
      description: "Sinistro Auto - Tamponamento"
    },
    {
      id: "3",
      title: "Forma Specifica",
      type: "specific",
      status: "completed",
      priority: "low",
      startTime: "16:00",
      endTime: "17:00",
      date: new Date(),
      clientName: "Andrea Verde",
      clientCode: "VRDNDR75B12L736W",
      claimNumber: "2025/CAS/009012",
      address: "Corso Torino 8, Torino",
      phone: "+39 347 5551234",
      description: "Danni da Grandine - Villa"
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 flex flex-col lg:ml-0">
          <CalendarHeader 
            viewType={viewType}
            setViewType={setViewType}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            filters={filters}
            setFilters={setFilters}
            onNewAppointment={() => setIsNewAppointmentOpen(true)}
          />
          
          <CalendarMetrics appointments={appointments} />
          
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 p-4 lg:p-6">
              <CalendarView 
                viewType={viewType}
                selectedDate={selectedDate}
                appointments={appointments}
                filters={filters}
              />
            </div>
            
            <div className="hidden xl:block w-80 border-l border-border">
              <CalendarSidebar 
                selectedDate={selectedDate}
                appointments={appointments}
                onNewAppointment={() => setIsNewAppointmentOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>

      <NewAppointmentModal 
        isOpen={isNewAppointmentOpen}
        onClose={() => setIsNewAppointmentOpen(false)}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Calendar;