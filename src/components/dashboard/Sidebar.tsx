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
  XCircle,
  Sun,
  Moon
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

const navigationItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Sinistri", icon: FileText, href: "/sinistri" },
  { name: "Clienti", icon: Users, href: "/clienti" },
  { name: "Calendario", icon: Calendar, href: "/calendario" },
  { name: "Report", icon: BarChart3, href: "/report" },
];

const quickFilters = [
  { name: "In Attesa", icon: Clock, count: 12, color: "warning", status: "pending" },
  { name: "In Lavorazione", icon: AlertTriangle, count: 8, color: "primary", status: "in_progress" },
  { name: "Completati", icon: CheckCircle, count: 45, color: "success", status: "completed" },
  { name: "Annullati", icon: XCircle, count: 3, color: "destructive", status: "cancelled" },
];

interface SidebarProps {
  activeStatusFilter?: string | null;
  onStatusFilterChange?: (status: string | null) => void;
}

export const Sidebar = ({ activeStatusFilter, onStatusFilterChange }: SidebarProps = {}) => {
  const currentPath = window.location.pathname;
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';
  
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };
  
  return (
    <aside className="w-64 bg-card border-r border-border h-full flex flex-col lg:h-auto">
      <nav className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="pt-6">
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Filtri Rapidi
          </h3>
          <div className="space-y-1">
            {quickFilters.map((filter) => {
              const isActive = activeStatusFilter === filter.status;
              return (
                <button
                  key={filter.name}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-secondary"
                  )}
                  onClick={() => onStatusFilterChange?.(isActive ? null : filter.status)}
                >
                  <div className="flex items-center space-x-3">
                    <filter.icon 
                      className={cn(
                        "h-4 w-4",
                        isActive && "text-primary-foreground",
                        !isActive && filter.color === "warning" && "text-warning",
                        !isActive && filter.color === "primary" && "text-primary",
                        !isActive && filter.color === "success" && "text-success",
                        !isActive && filter.color === "destructive" && "text-destructive"
                      )} 
                    />
                    <span className={isActive ? "text-primary-foreground" : "text-foreground"}>
                      {filter.name}
                    </span>
                  </div>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    isActive && "bg-primary-foreground/20 text-primary-foreground",
                    !isActive && filter.color === "warning" && "bg-warning/10 text-warning",
                    !isActive && filter.color === "primary" && "bg-primary/10 text-primary",
                    !isActive && filter.color === "success" && "bg-success/10 text-success",
                    !isActive && filter.color === "destructive" && "bg-destructive/10 text-destructive"
                  )}>
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between px-3 py-2 mb-3">
          <div className="flex items-center space-x-3">
            {mounted && (isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />)}
            <span className="text-sm text-foreground">
              {mounted && (isDark ? "Modalità Scura" : "Modalità Chiara")}
            </span>
          </div>
          {mounted && (
            <Switch
              checked={isDark}
              onCheckedChange={toggleTheme}
              aria-label="Cambia tema"
            />
          )}
        </div>
        
        <Link
          to="/impostazioni"
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full mb-3",
            currentPath === "/impostazioni"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          )}
        >
          <Settings className="h-5 w-5" />
          <span>Impostazioni</span>
        </Link>
        <div className="text-center text-xs text-muted-foreground">
          <p>© 2025 G Insurance Consulting</p>
          <p>Versione 1.0.0</p>
        </div>
      </div>
    </aside>
  );
};