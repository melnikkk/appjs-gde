import { createFileRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { AuthLayout } from '@/pages/layouts/AuthLayout';

export const Route = createFileRoute('/_auth')({
  component: () => (
    <>
      <AuthLayout>
        <Outlet />
      </AuthLayout>
      <TanStackRouterDevtools />
    </>
  ),
});
