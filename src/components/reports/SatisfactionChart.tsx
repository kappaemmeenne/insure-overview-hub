import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface SatisfactionData {
  mese: string;
  rating: number;
}

interface SatisfactionChartProps {
  data: SatisfactionData[];
}

export const SatisfactionChart = ({ data }: SatisfactionChartProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium">{`${label} 2025`}</p>
          <p className="text-sm text-muted-foreground">
            Rating: {payload[0].value.toFixed(1)}/5.0
          </p>
          <p className="text-sm text-muted-foreground">
            Percentuale: {((payload[0].value / 5) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Soddisfazione Clienti nel Tempo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="mese" 
                className="text-sm fill-muted-foreground"
              />
              <YAxis 
                domain={[3.5, 5.0]}
                className="text-sm fill-muted-foreground"
                tickFormatter={(value) => value.toFixed(1)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="rating"
                stroke="hsl(var(--warning))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRating)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Statistiche soddisfazione */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">4.8</div>
            <div className="text-sm text-muted-foreground">Rating Attuale</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">+2%</div>
            <div className="text-sm text-muted-foreground">vs Mese Scorso</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">94%</div>
            <div className="text-sm text-muted-foreground">Soddisfazione</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">156</div>
            <div className="text-sm text-muted-foreground">Recensioni</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};