import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/shared/auth';

export const Route = createFileRoute('/profile')({
  component: () => (
    <ProtectedRoute>
      <div>
        <h3>Profile Page</h3>
        <p>This is the user profile page.</p>
      </div>
    </ProtectedRoute>
  ),
});
