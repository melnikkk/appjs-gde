import { SignUp } from '@clerk/clerk-react';
import { PublicRoute } from '@/shared/auth';

export const SignUpPage = () => {
  const redirect = '/recordings';

  return (
    <PublicRoute redirectAuthenticated redirectTo={redirect}>
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-md p-6">
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            fallbackRedirectUrl={redirect}
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

export default SignUpPage;
