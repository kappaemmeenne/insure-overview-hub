import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TimeData {
  giorni: string;
  count: number;
}

interface TimeChartProps {
  data: TimeData[];
}

export const TimeChart = ({ data }: TimeChartProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium">{label} giorni</p>
          <p className="text-sm text-muted-foreground">
            Sinistri: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tempo di Chiusura</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="giorni" 
                className="text-sm fill-muted-foreground"
              />
              <YAxis className="text-sm fill-muted-foreground" />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Statistiche */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold">5.2</div>
            <div className="text-xs text-muted-foreground">Giorni medi</div>
          </div>
          <div>
            <div className="text-lg font-bold">65%</div>
            <div className="text-xs text-muted-foreground">Entro 6 giorni</div>
          </div>
          <div>
            <div className="text-lg font-bold">15</div>
            <div className="text-xs text-muted-foreground">Più veloce</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};