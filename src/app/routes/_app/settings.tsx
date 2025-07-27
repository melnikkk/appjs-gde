import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/shared/auth';

export const Route = createFileRoute('/_app/settings')({
  component: () => (
    <ProtectedRoute>
      <div>
        <h3>Settings Page</h3>
        <p>You can configure your application settings here.</p>
      </div>
    </ProtectedRoute>
  ),
});
