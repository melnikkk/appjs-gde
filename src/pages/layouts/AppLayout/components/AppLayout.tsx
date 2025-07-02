import { Toaster } from 'sonner';
import { SidebarProvider } from '@/shared/ui-kit/sidebar';
import { HeaderPortsProvider, HeaderRegistry } from '@/app/providers/HeaderProvider';
import { AppSidebar } from './LeftSidebar';
import { DynamicHeader } from './DynamicHeader';

interface Props {
  children: React.ReactNode;
}

export const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <HeaderPortsProvider>
      <HeaderRegistry />
      <SidebarProvider>
        <Toaster position="top-right" />
        <AppSidebar />

        <main className="flex-1 overflow-y-auto">
          <DynamicHeader />
          <div className="mt-[var(--header-height)] h-[calc(100%-var(--header-height))]">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </HeaderPortsProvider>
  );
};
