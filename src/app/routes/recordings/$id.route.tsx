import { createFileRoute } from '@tanstack/react-router';
import { RecordingPage } from '@/pages/recording';

const RecordingPageWrapper = () => {
  return (
    <div
      className="h-full"
      data-header-title="Guide Editor"
      data-can-save
      data-can-export
    >
      <RecordingPage />
    </div>
  );
};

export const Route = createFileRoute('/recordings/$id')({
  component: RecordingPageWrapper,
});
