import { HeaderComponentProps } from '@/shared/types/header';
import { useRouterState } from '@tanstack/react-router';
import { AvatarDropdown, useAuth } from '@/shared/auth';

export const DefaultHeader: React.FC<HeaderComponentProps> = () => {
  const {
    location: { pathname: routePath },
  } = useRouterState();

  const { isSignedIn } = useAuth();

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

  return (
    <div className="flex w-full items-center justify-between">
      <h2 className="text-lg font-semibold">{title}</h2>
      {isSignedIn && (
        <div className="ml-auto">
          <AvatarDropdown />
        </div>
      )}
    </div>
  );
};
