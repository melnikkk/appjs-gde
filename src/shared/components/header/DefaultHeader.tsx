import { HeaderComponentProps } from '@/shared/types/header';
import { useRouterState } from '@tanstack/react-router';

export const DefaultHeader: React.FC<HeaderComponentProps> = () => {
  const {
    location: { pathname: routePath },
  } = useRouterState();

  let title = 'Guide Creator';

  if (routePath === '/recordings') {
    title = 'Recordings';
  } else if (routePath === '/guides') {
    title = 'Guides';
  } else if (routePath === '/profile') {
    title = 'Profile';
  } else if (routePath === '/settings') {
    title = 'Settings';
  }

  return <div className="font-semibold">{title}</div>;
};
