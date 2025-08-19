import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface TrendData {
  mese: string;
  sinistri: number;
  completati: number;
}

interface TrendChartProps {
  data: TrendData[];
}

export const TrendChart = ({ data }: TrendChartProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium">{`${label} 2025`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.dataKey === 'sinistri' ? 'Sinistri' : 'Completati'}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Trend Mensile Sinistri
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="mese" 
                className="text-sm fill-muted-foreground"
              />
              <YAxis 
                className="text-sm fill-muted-foreground"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="sinistri" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                name="Sinistri"
              />
              <Line 
                type="monotone" 
                dataKey="completati" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
                name="Completati"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};