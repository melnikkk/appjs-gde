import { ChevronLeft } from 'lucide-react';
import { Button } from '@/shared/ui-kit/button';
import { useRecordingEventNavigation } from '../model/useRecordingEventNavigation';

interface Props {
  startPointTimestamp: number;
}

export const PreviousRecordingEventButton: React.FC<Props> = ({
  startPointTimestamp,
}) => {
  const { navigateToPreviousEvent } = useRecordingEventNavigation(startPointTimestamp);

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 p-0"
      onClick={navigateToPreviousEvent}
      aria-label="Previous event"
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
};
