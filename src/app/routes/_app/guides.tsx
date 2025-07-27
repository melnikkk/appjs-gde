import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/shared/auth/components/ProtectedRoute';

export const Route = createFileRoute('/_app/guides')({
  component: () => (
    <ProtectedRoute>
      <h3>Guides</h3>
    </ProtectedRoute>
  ),
});
