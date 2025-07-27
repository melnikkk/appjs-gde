import { createFileRoute } from '@tanstack/react-router';
import { RecordingPage } from '@/pages/Recording';
import { ProtectedRoute } from '@/shared/auth';

export const Route = createFileRoute('/_app/recordings/$id')({
  component: () => (
    <ProtectedRoute>
      <div className="h-full" data-can-save data-can-export>
        <RecordingPage />
      </div>
    </ProtectedRoute>
  ),
});
