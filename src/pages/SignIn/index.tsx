import { SignIn } from '@clerk/clerk-react';
import { useLocation } from '@tanstack/react-router';
import { PublicRoute } from '@/shared/auth';

export const SignInPage = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get('redirect') || '/';

  return (
    <PublicRoute redirectAuthenticated redirectTo={redirect}>
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-md p-6">
          <SignIn
            signUpUrl="/sign-up"
            appearance={{
              layout: {
                socialButtonsVariant: 'iconButton',
                socialButtonsPlacement: 'bottom',
              },
            }}
          />
        </div>
      </div>
    </PublicRoute>
  );
};

export default SignInPage;
