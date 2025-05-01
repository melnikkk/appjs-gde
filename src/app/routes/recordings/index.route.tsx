import { createFileRoute } from '@tanstack/react-router';
import { RecordingsPage } from '@/app/pages/Recordings';

export const Route = createFileRoute('/recordings/')({
  component: RecordingsPage,
});