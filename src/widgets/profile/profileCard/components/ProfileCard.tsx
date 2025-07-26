import { useUser } from '@/shared/auth';
import { SignOutButton } from '@/features/user';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/shared/ui-kit/card';

export const ProfileCard = () => {
  const { user } = useUser();

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          {user?.imageUrl && (
            <img
              src={user.imageUrl}
              alt={user.fullName || 'User'}
              className="h-16 w-16 rounded-full"
            />
          )}
          <div>
            <p className="text-lg font-medium">{user?.username}</p>
            <p className="text-muted-foreground text-sm">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <SignOutButton />
      </CardFooter>
    </Card>
  );
};
