import { Settings, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const SettingsHeader = () => {
  return (
    <Card className="p-4 lg:p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Settings className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Impostazioni</h1>
            <p className="text-sm text-muted-foreground">
              Configura il tuo account e personalizza l'esperienza
            </p>
          </div>
        </div>
        
        <Button className="self-start sm:self-auto">
          <Save className="h-4 w-4 mr-2" />
          Salva Tutto
        </Button>
      </div>
    </Card>
  );
};