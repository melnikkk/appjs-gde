import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/shared/auth';
import { ProfilePage } from '@/pages/Profile';

export const Route = createFileRoute('/profile')({
  component: () => (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  ),
});
