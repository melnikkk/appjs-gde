import { createFileRoute } from '@tanstack/react-router';
import { RecordingsPage } from '@/pages/recordings';

export const Route = createFileRoute('/recordings/')({
  component: () => (
    <div data-header-title="Recordings">
      <RecordingsPage />
    </div>
  ),
});
