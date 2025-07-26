import { ClerkProvider } from '@clerk/clerk-react';
import { AuthStateManager } from './AuthStateManager';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export const ClerkAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AuthStateManager />
      {children}
    </ClerkProvider>
  );
};
