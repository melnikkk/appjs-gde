import { SignInPage } from '@/pages/SignIn';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/sign-in')({
  component: () => <SignInPage />,
});
