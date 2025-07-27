import { Button } from '@/shared/ui-kit/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui-kit/popover';
import { useClerk, useUser } from '@clerk/clerk-react';
import { useNavigate } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';

export const AvatarDropdown: React.FC = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();

    navigate({ to: '/' });
  };

  if (!user) {
    return null;
  }

  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    '';

  const displayName = user?.fullName || user?.username || '';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="border-border hover:border-primary focus-visible:ring-ring flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border transition-colors outline-none focus-visible:ring-2"
          aria-label="User menu"
        >
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={displayName || 'User avatar'}
              className="h-full w-full cursor-pointer object-cover"
            />
          ) : (
            <div className="bg-primary text-primary-foreground flex h-full w-full items-center justify-center text-sm font-medium">
              {displayName}
            </div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="end" sideOffset={8}>
        <div className="border-b p-3">
          <div className="font-medium">{displayName}</div>
          <div className="text-muted-foreground truncate text-sm">{email}</div>
        </div>
        <div className="p-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
