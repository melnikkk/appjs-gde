import { Toaster } from 'sonner';
import { useRouterState } from '@tanstack/react-router';
import { SidebarProvider } from '@/components/ui/sidebar';
import {
  HeaderPortsProvider,
  useHeaderPorts,
} from '@/app/shared/contexts/HeaderPortsContext';
import { useHeaderTitle } from '@/app/shared/hooks/useHeaderTitle';
import { AppSidebar } from './components/LeftSidebar/LeftSidebar';
import { Header } from './components/Header';
import { HeaderRegistry } from './components/Header/HeaderRegistry';

interface Props {
  children: React.ReactNode;
}

const DynamicHeader: React.FC = () => {
  const routerState = useRouterState();

  const headerTitle = useHeaderTitle();
  const { getHeaderForPath } = useHeaderPorts();

  const routePath = routerState.location.pathname;
  const HeaderComponent = getHeaderForPath(routePath) || (() => null);

  return (
    <Header title={headerTitle}>
      <HeaderComponent title={headerTitle} />
    </Header>
  );
};

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
