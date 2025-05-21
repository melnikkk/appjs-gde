import { createFileRoute } from '@tanstack/react-router';
import { RecordingPage } from '@/app/pages/Recording';

export const Route = createFileRoute('/recordings/$id')({
  component: RecordingPageWrapper,
});

function RecordingPageWrapper() {
  return (
    <div data-header-title="Guide Editor" data-can-save data-can-export>
      <RecordingPage />
    </div>
  );
}
