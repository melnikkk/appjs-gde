import { UserButton } from '@clerk/clerk-react';
import { useUserDisplayInfo } from '../lib';

export const UserMenu = () => {
  const { displayName } = useUserDisplayInfo();

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm md:inline">{displayName}</span>
      <UserButton
        appearance={{
          elements: {
            avatarBox: 'h-8 w-8',
          },
        }}
      />
    </div>
  );
};
