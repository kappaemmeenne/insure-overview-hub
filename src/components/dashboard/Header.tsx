import { Bell, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

export const Header = () => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center space-x-4">
        {/* Mobile menu trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/21710150-7949-41db-81cc-4c6da0c5fc19.png" 
            alt="G Insurance Consulting" 
            className="h-8 hidden sm:block"
          />
          <img 
            src="/lovable-uploads/b193620b-9683-42db-9e81-9175a21c0fbe.png" 
            alt="GIC" 
            className="h-8 w-8 sm:hidden"
          />
        </div>
      </div>

      <div className="flex-1 max-w-md mx-4 lg:mx-8 hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Cerca sinistri, clienti, pratiche..."
            className="pl-10 bg-secondary/50"
          />
        </div>
      </div>

      {/* Mobile search button */}
      <Button variant="ghost" size="icon" className="sm:hidden">
        <Search className="h-5 w-5" />
      </Button>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs">
            3
          </Badge>
        </Button>

        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium">Antonio Pezzella</p>
            <p className="text-xs text-muted-foreground">Perito Senior</p>
          </div>
        </div>
      </div>
    </header>
  );
};