import { useUser } from './hooks';

export interface UserDisplayInfo {
  fullName: string | null;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  email: string | null;
  username: string | null;
  displayName: string;
}

export const useUserDisplayInfo = (): UserDisplayInfo => {
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

  // Choose the most appropriate display name based on availability
  const displayName = fullName || username || email || 'User';

  return {
    fullName,
    firstName: firstName || null,
    lastName: lastName || null,
    imageUrl: imageUrl || null,
    email,
    username: username || null,
    displayName,
  };
};
