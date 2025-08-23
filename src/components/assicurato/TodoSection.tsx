import { CheckSquare, Upload, FileSignature, CreditCard, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const todoItems = [
  {
    id: 1,
    title: "Carica certificato medico",
    description: "Necessario per completare la pratica AUTO-2024-001",
    priority: "high",
    icon: Upload,
    action: "Carica ora",
    completed: false
  },
  {
    id: 2,
    title: "Firma modulo consenso",
    description: "Consenso per il trattamento dati sanitari",
    priority: "medium",
    icon: FileSignature,
    action: "Firma digitalmente",
    completed: false
  },
  {
    id: 3,
    title: "Pagamento premio annuale",
    description: "Scadenza 15 Gennaio 2025 - Polizza Vita",
    priority: "high",
    icon: CreditCard,
    action: "Paga ora",
    completed: false
  },
  {
    id: 4,
    title: "Verifica dati anagrafici",
    description: "Aggiorna le tue informazioni di contatto",
    priority: "low",
    icon: CheckSquare,
    action: "Vai al profilo",
    completed: true
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "text-destructive bg-destructive/10";
    case "medium": return "text-warning bg-warning/10";
    case "low": return "text-success bg-success/10";
    default: return "text-muted-foreground bg-muted";
  }
};

const getPriorityText = (priority: string) => {
  switch (priority) {
    case "high": return "Alta";
    case "medium": return "Media";
    case "low": return "Bassa";
    default: return "Normale";
  }
};

export const TodoSection = () => {
  const completedItems = todoItems.filter(item => item.completed).length;
  const totalItems = todoItems.length;
  const progressPercentage = (completedItems / totalItems) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <CheckSquare className="h-5 w-5 text-primary" />
            Azioni da Fare
          </CardTitle>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              {completedItems} di {totalItems} completate
            </p>
            <Progress value={progressPercentage} className="w-24 mt-1" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {todoItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`p-4 rounded-lg border ${
                item.completed 
                  ? "bg-success/5 border-success/20" 
                  : "bg-card hover:bg-muted/50"
              } transition-all duration-200`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${
                  item.completed ? "bg-success/20" : "bg-primary/10"
                }`}>
                  <IconComponent className={`h-5 w-5 ${
                    item.completed ? "text-success" : "text-primary"
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`font-semibold ${
                        item.completed ? "text-muted-foreground line-through" : "text-foreground"
                      }`}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!item.completed && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                          {getPriorityText(item.priority)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    {!item.completed ? (
                      <Button size="sm" className="text-xs">
                        {item.action}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled className="text-xs">
                        Completata
                        <CheckSquare className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};