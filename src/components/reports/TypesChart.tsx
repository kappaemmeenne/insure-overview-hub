import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TypeData {
  tipo: string;
  count: number;
  importo: string;
  color: string;
}

interface TypesChartProps {
  data: TypeData[];
}

export const TypesChart = ({ data }: TypesChartProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            Sinistri: {data.count}
          </p>
          <p className="text-sm text-muted-foreground">
            Importo: {data.importo}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomBar = (props: any) => {
    const { fill, ...rest } = props;
    return <Bar {...rest} fill={props.payload.color} />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tipologie Sinistri</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="tipo" 
                className="text-sm fill-muted-foreground"
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis className="text-sm fill-muted-foreground" />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                radius={[4, 4, 0, 0]}
                shape={<CustomBar />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legenda con importi */}
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded" 
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.tipo}</span>
              </div>
              <span className="font-medium">{item.importo}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};