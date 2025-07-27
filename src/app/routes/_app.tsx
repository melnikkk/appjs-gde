import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppLayout as MainAppLayout } from '@/pages/layouts/AppLayout/components/AppLayout';

export const Route = createFileRoute('/_app')({
  component: () => (
    <MainAppLayout>
      <Outlet />
    </MainAppLayout>
  ),
});
