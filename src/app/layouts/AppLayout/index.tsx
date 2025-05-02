import { useCallback } from "react";
import { SidebarProvider } from "../../../components/ui/sidebar"
import { AppSidebar } from "./components/LeftSidebar"
import { useRouterState } from "@tanstack/react-router";
import { Header } from "./components/Header";


interface Props {
  children: React.ReactNode;
}

export const AppLayout: React.FC<Props> = ({ children }) => {
  const routerState = useRouterState();
  
  const routePath = routerState.location.pathname;

  const handleSave = useCallback(() => {
    console.log('Saving guide');
  }, []);

  const handleExport = useCallback(() => {
    console.log('Exporting guide');
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex-1 overflow-y-auto">
        <Header
          title='Guide Creator'
          onSave={routePath.includes('/recordings/') ? handleSave : undefined}
          onExport={routePath.includes('/recordings/') ? handleExport : undefined}
        />
        <div className="p-6">
          {children}
        </div>
      </main>
    </SidebarProvider>

  )
}
