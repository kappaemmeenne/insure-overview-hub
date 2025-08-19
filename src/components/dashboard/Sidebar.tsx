import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/", active: true },
  { name: "Sinistri", icon: FileText, href: "/sinistri" },
  { name: "Clienti", icon: Users, href: "/clienti" },
  { name: "Calendario", icon: Calendar, href: "/calendario" },
  { name: "Report", icon: BarChart3, href: "/report" },
];

const quickFilters = [
  { name: "In Attesa", icon: Clock, count: 12, color: "warning" },
  { name: "In Lavorazione", icon: AlertTriangle, count: 8, color: "primary" },
  { name: "Completati", icon: CheckCircle, count: 45, color: "success" },
  { name: "Annullati", icon: XCircle, count: 3, color: "destructive" },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-card border-r border-border h-full flex flex-col">
      <nav className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                item.active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </a>
          ))}
        </div>

        <div className="pt-6">
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Filtri Rapidi
          </h3>
          <div className="space-y-1">
            {quickFilters.map((filter) => (
              <button
                key={filter.name}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-secondary transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <filter.icon 
                    className={cn(
                      "h-4 w-4",
                      filter.color === "warning" && "text-warning",
                      filter.color === "primary" && "text-primary",
                      filter.color === "success" && "text-success",
                      filter.color === "destructive" && "text-destructive"
                    )} 
                  />
                  <span className="text-foreground">{filter.name}</span>
                </div>
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  filter.color === "warning" && "bg-warning/10 text-warning",
                  filter.color === "primary" && "bg-primary/10 text-primary",
                  filter.color === "success" && "bg-success/10 text-success",
                  filter.color === "destructive" && "bg-destructive/10 text-destructive"
                )}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <button className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors w-full">
          <Settings className="h-5 w-5" />
          <span>Impostazioni</span>
        </button>
      </div>
    </aside>
  );
};