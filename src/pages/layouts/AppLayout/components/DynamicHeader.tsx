import { Header } from './Header';
import { useRouterState } from '@tanstack/react-router';
import { useHeaderPorts } from '@/app/providers/HeaderProvider';

export const DynamicHeader: React.FC = () => {
  const routerState = useRouterState();
  const { getHeaderForPath } = useHeaderPorts();
  const routePath = routerState.location.pathname;

  const HeaderComponent = getHeaderForPath(routePath) || (() => null);

  return (
    <Header>
      <HeaderComponent />
    </Header>
  );
};
