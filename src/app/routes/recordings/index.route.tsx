import { createFileRoute } from '@tanstack/react-router';
import { RecordingsPage } from '@/pages/Recordings';

export const Route = createFileRoute('/recordings/')({
  component: () => (
    <div>
      <RecordingsPage />
    </div>
  ),
});
