import { useCallback } from 'react';
import { Toaster } from 'sonner';
import { useRouterState } from '@tanstack/react-router';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useHeaderTitle } from '@/app/shared/hooks/useHeaderTitle';
import { AppSidebar } from './components/LeftSidebar';
import { Header } from './components/Header';

interface Props {
  children: React.ReactNode;
}

export const AppLayout: React.FC<Props> = ({ children }) => {
  const routerState = useRouterState();
  const headerTitle = useHeaderTitle();

  const routePath = routerState.location.pathname;

  const handleSave = useCallback(() => {
    console.log('Saving guide');
  }, []);

  const handleExport = useCallback(() => {
    console.log('Exporting guide');
  }, []);

  return (
    <SidebarProvider>
      <Toaster position="top-right" />
      <AppSidebar />

      <main className="flex-1 overflow-y-auto">
        <Header
          title={headerTitle}
          onSave={routePath.includes('/recordings/') ? handleSave : undefined}
          onExport={routePath.includes('/recordings/') ? handleExport : undefined}
        />
        <div className="mt-[var(--header-height)] h-[calc(100%-var(--header-height))]">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};
