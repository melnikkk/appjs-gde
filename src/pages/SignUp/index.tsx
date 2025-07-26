import { SignUp } from '@clerk/clerk-react';
import { PublicRoute } from '@/shared/auth';

export const SignUpPage = () => {
  const redirect = '/recordings';

  return (
    <PublicRoute redirectAuthenticated redirectTo={redirect}>
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-md p-6">
          <SignUp
            signInUrl="/sign-in"
            appearance={{
              layout: {
                socialButtonsVariant: 'iconButton',
                socialButtonsPlacement: 'bottom',
              },
              elements: {
                formButtonPrimary:
                  'bg-primary text-primary-foreground hover:bg-primary/90',
                card: 'rounded-md shadow-md',
              },
            }}
          />
        </div>
      </div>
    </PublicRoute>
  );
};

export default SignUpPage;
