import { createFileRoute } from '@tanstack/react-router';
import { RecordingPage } from '@/pages/Recording';
import { ProtectedRoute } from '@/shared/auth';

const RecordingPageWrapper = () => {
  return (
    <ProtectedRoute>
      <div className="h-full" data-can-save data-can-export>
        <RecordingPage />
      </div>
    </ProtectedRoute>
  );
};

export const Route = createFileRoute('/recordings/$id')({
  component: RecordingPageWrapper,
});
