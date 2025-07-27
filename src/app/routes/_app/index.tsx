import { ProtectedRoute } from '@/shared/auth';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/')({
  component: () => (
    <ProtectedRoute>
      <div>Dashboard</div>
    </ProtectedRoute>
  ),
});
