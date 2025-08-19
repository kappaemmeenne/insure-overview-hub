import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Clock, Star, FileText, Loader2 } from "lucide-react";

interface Metriche {
  sinistri_mese: number;
  in_lavorazione: number;
  completati_mese: number;
  tempo_medio: string;
  soddisfazione: string;
  crescita_sinistri: string;
  performance_tempo: string;
  crescita_soddisfazione: string;
}

interface KPICardsProps {
  metriche: Metriche;
}

export const KPICards = ({ metriche }: KPICardsProps) => {
  const kpiData = [
    {
      title: "Sinistri Totali",
      value: metriche.sinistri_mese,
      change: metriche.crescita_sinistri,
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
      trend: "up" as const
    },
    {
      title: "In Lavorazione",
      value: metriche.in_lavorazione,
      subtitle: `${metriche.completati_mese} completati`,
      icon: Loader2,
      color: "text-warning",
      bgColor: "bg-warning/10",
      trend: null
    },
    {
      title: "Tempo Medio",
      value: metriche.tempo_medio,
      change: metriche.performance_tempo,
      icon: Clock,
      color: "text-success",
      bgColor: "bg-success/10",
      trend: "down" as const // down è buono per i tempi
    },
    {
      title: "Soddisfazione",
      value: metriche.soddisfazione,
      change: metriche.crescita_soddisfazione,
      icon: Star,
      color: "text-warning",
      bgColor: "bg-warning/10",
      trend: "up" as const
    }
  ];

  const getTrendIcon = (trend: "up" | "down" | null) => {
    if (trend === "up") return <TrendingUp className="h-3 w-3 text-success" />;
    if (trend === "down") return <TrendingDown className="h-3 w-3 text-destructive" />;
    return null;
  };

  const getTrendColor = (change: string, trend: "up" | "down" | null) => {
    if (!trend || !change) return "";
    
    const isPositive = change.startsWith("+");
    if (trend === "up") {
      return isPositive ? "text-success" : "text-destructive";
    } else {
      return isPositive ? "text-destructive" : "text-success";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <div className={`w-8 h-8 rounded-full ${kpi.bgColor} flex items-center justify-center`}>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-2xl font-bold">
                {kpi.value}
              </div>
              
              {kpi.change && (
                <div className="flex items-center gap-1">
                  {getTrendIcon(kpi.trend)}
                  <span className={`text-xs font-medium ${getTrendColor(kpi.change, kpi.trend)}`}>
                    {kpi.change}
                  </span>
                  <span className="text-xs text-muted-foreground">vs mese scorso</span>
                </div>
              )}
              
              {kpi.subtitle && (
                <p className="text-xs text-muted-foreground">
                  {kpi.subtitle}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};