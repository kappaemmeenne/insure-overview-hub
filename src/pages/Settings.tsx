import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { ProfileSection } from "@/components/settings/ProfileSection";
import { NotificationsSection } from "@/components/settings/NotificationsSection";
import { CompanySection } from "@/components/settings/CompanySection";
import { IntegrationsSection } from "@/components/settings/IntegrationsSection";
import { InterfaceSection } from "@/components/settings/InterfaceSection";
import { SecuritySection } from "@/components/settings/SecuritySection";
import { BackupSection } from "@/components/settings/BackupSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
            <SettingsHeader />
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-4 lg:grid-cols-7 gap-1 h-auto p-1">
                <TabsTrigger value="profile" className="text-xs px-2 py-2">
                  👤 Profilo
                </TabsTrigger>
                <TabsTrigger value="notifications" className="text-xs px-2 py-2">
                  🔔 Notifiche
                </TabsTrigger>
                <TabsTrigger value="company" className="text-xs px-2 py-2">
                  🏢 Aziendale
                </TabsTrigger>
                <TabsTrigger value="integrations" className="text-xs px-2 py-2">
                  📱 Integrazioni
                </TabsTrigger>
                <TabsTrigger value="interface" className="text-xs px-2 py-2">
                  🎨 Interfaccia
                </TabsTrigger>
                <TabsTrigger value="security" className="text-xs px-2 py-2">
                  🔒 Sicurezza
                </TabsTrigger>
                <TabsTrigger value="backup" className="text-xs px-2 py-2">
                  📊 Backup
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <ProfileSection />
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <NotificationsSection />
              </TabsContent>

              <TabsContent value="company" className="space-y-6">
                <CompanySection />
              </TabsContent>

              <TabsContent value="integrations" className="space-y-6">
                <IntegrationsSection />
              </TabsContent>

              <TabsContent value="interface" className="space-y-6">
                <InterfaceSection />
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <SecuritySection />
              </TabsContent>

              <TabsContent value="backup" className="space-y-6">
                <BackupSection />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;