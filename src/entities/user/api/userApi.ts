import { useUser } from '@/shared/auth/lib/hooks';
import { UserInfo } from '../model';

export const useUserDisplayInfo = (): UserInfo => {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn || !user) {
    return {
      fullName: null,
      firstName: null,
      lastName: null,
      imageUrl: null,
      email: null,
      username: null,
      displayName: 'Guest',
    };
  }

  const { firstName, lastName, imageUrl, primaryEmailAddress, username } = user;

  const fullName = user.fullName || [firstName, lastName].filter(Boolean).join(' ');
  const email = primaryEmailAddress?.emailAddress || null;

  const displayName = fullName || username || email || 'User';

  return {
    fullName,
    email,
    displayName,
    firstName: firstName || null,
    lastName: lastName || null,
    imageUrl: imageUrl || null,
    username: username || null,
  };
};
