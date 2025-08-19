import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { it } from "date-fns/locale";
import type { Appointment } from "../../pages/Calendar";

interface CalendarMetricsProps {
  appointments: Appointment[];
}

interface MetricData {
  title: string;
  completed: number;
  total: number;
  percentage: number;
  urgent?: number;
}

export const CalendarMetrics = ({ appointments }: CalendarMetricsProps) => {
  const today = new Date();
  
  const getAppointmentsInRange = (start: Date, end: Date) => {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate >= start && aptDate <= end;
    });
  };

  const calculateMetrics = (appointmentsInRange: Appointment[]): Omit<MetricData, 'title'> => {
    const total = appointmentsInRange.length;
    const completed = appointmentsInRange.filter(apt => apt.status === "completed").length;
    const urgent = appointmentsInRange.filter(apt => apt.priority === "urgent").length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { completed, total, percentage, urgent };
  };

  const todayAppointments = getAppointmentsInRange(startOfDay(today), endOfDay(today));
  const weekAppointments = getAppointmentsInRange(startOfWeek(today, { weekStartsOn: 1 }), endOfWeek(today, { weekStartsOn: 1 }));
  const monthAppointments = getAppointmentsInRange(startOfMonth(today), endOfMonth(today));
  const backlogAppointments = appointments.filter(apt => apt.status === "planned");

  const metrics: MetricData[] = [
    {
      title: "Oggi",
      ...calculateMetrics(todayAppointments)
    },
    {
      title: "Questa Sett.",
      ...calculateMetrics(weekAppointments)
    },
    {
      title: "Questo Mese",
      ...calculateMetrics(monthAppointments)
    },
    {
      title: "Backlog",
      completed: 0,
      total: backlogAppointments.length,
      percentage: 0,
      urgent: backlogAppointments.filter(apt => apt.priority === "urgent").length
    }
  ];

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return "text-success";
    if (percentage >= 70) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="p-4 lg:p-6 border-b border-border">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-card">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    {metric.title}
                  </h3>
                  {metric.urgent && metric.urgent > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {metric.urgent} Urgenti
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-1">
                  <div className="text-lg font-semibold">
                    {metric.completed}/{metric.total} Apps
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${getPercentageColor(metric.percentage)}`}>
                      {metric.percentage}% Compl.
                    </span>
                    
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          metric.percentage >= 90 
                            ? "bg-success" 
                            : metric.percentage >= 70 
                            ? "bg-warning" 
                            : "bg-destructive"
                        }`}
                        style={{ width: `${metric.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};