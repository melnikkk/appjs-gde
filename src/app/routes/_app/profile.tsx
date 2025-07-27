import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/shared/auth';
import { ProfilePage } from '@/pages/Profile';

export const Route = createFileRoute('/_app/profile')({
  component: () => (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  ),
});
