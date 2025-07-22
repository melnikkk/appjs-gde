import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../lib/hooks';

interface PublicRouteProps {
  children: ReactNode;
  redirectAuthenticated?: boolean;
  redirectTo?: string;
}

export const PublicRoute: FC<PublicRouteProps> = ({
  children,
  redirectAuthenticated = false,
  redirectTo = '/',
}) => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn && redirectAuthenticated) {
      navigate({ to: redirectTo, replace: true });
    }
  }, [isSignedIn, isLoaded, navigate, redirectAuthenticated, redirectTo]);

  if (!isLoaded) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="mt-4">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (redirectAuthenticated && isSignedIn) {
    return null;
  }

  return children;
};
