import { FC, useEffect } from 'react';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAuth, useUser } from '../lib/hooks';
import { setAuthState } from '../model/slice';

export const AuthStateManager: FC = () => {
  const { isSignedIn, isLoaded } = useAuth();

  const { user } = useUser();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoaded) {
      dispatch(
        setAuthState({
          isAuthenticated: !!isSignedIn,
          userId: user?.id || null,
        }),
      );
    }
  }, [isSignedIn, user, isLoaded, dispatch]);

  return null;
};
