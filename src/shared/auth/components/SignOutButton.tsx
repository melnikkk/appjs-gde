import { useClerk } from '@clerk/clerk-react';
import { Button } from '@/shared/ui-kit/button';
import { LogOut } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export const SignOutButton: React.FC = () => {
  const { signOut } = useClerk();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();

    navigate({ to: '/' });
  };

  return (
    <Button onClick={handleSignOut} className="self-center">
      <LogOut size={16} />
      Sign Out
    </Button>
  );
};
