import {
  useAuth as useClerkAuth,
  useUser as useClerkUser,
  useClerk as useClerkCore,
} from '@clerk/clerk-react';

export const useAuth = useClerkAuth;
export const useUser = useClerkUser;
export const useClerk = useClerkCore;
