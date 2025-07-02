import { ChevronRight } from 'lucide-react';
import { Button } from '@/shared/ui-kit/button';
import { useRecordingEventNavigation } from '../model/useRecordingEventNavigation';

interface Props {
  startPointTimestamp: number;
}

export const NextRecordingEventButton: React.FC<Props> = ({ startPointTimestamp }) => {
  const { navigateToNextEvent } = useRecordingEventNavigation(startPointTimestamp);

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 p-0"
      onClick={navigateToNextEvent}
      aria-label="Next event"
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  );
};
