import { createFileRoute } from '@tanstack/react-router';
import { RecordingsPage } from '@/pages/Recordings';
import { ProtectedRoute } from '@/shared/auth';

export const Route = createFileRoute('/_app/recordings/')({
  component: () => (
    <ProtectedRoute>
      <RecordingsPage />
    </ProtectedRoute>
  ),
});
