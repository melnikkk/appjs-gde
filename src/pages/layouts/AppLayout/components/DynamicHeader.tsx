import { Header } from './Header';
import { useHeaderTitle } from '@/shared/hooks/useHeaderTitle';
import { useRouterState } from '@tanstack/react-router';
import { useHeaderPorts } from '@/app/providers/HeaderProvider';

export const DynamicHeader: React.FC = () => {
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
