import { useCallback } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { setCurrentEventIndex } from '@/infrastructure/store/slices/recordingEvents/slice';
import { Button } from '@/components/ui/button';
import { TrackerEvents } from '@/infrastructure/store/slices/editor/types';

interface Props {
  currentEventIndex: number;
  trackerEvents: TrackerEvents;
}

export const PreviousRecordingEventButton: React.FC<Props> = ({
  currentEventIndex,
  trackerEvents,
}) => {
  const dispatch = useAppDispatch();

  const eventsAmount = trackerEvents.length;
  const isDisabled = currentEventIndex === 0;

  const onPreviousClick = useCallback(() => {
    if (currentEventIndex > 0 && eventsAmount > 0) {
      const previousEventIndex = Math.max(0, currentEventIndex - 1);
      const previousEventId = trackerEvents[previousEventIndex];

      if (previousEventId) {
        dispatch(setCurrentEventIndex(previousEventIndex));
      }
    }
  }, [dispatch, currentEventIndex, eventsAmount, trackerEvents]);

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 p-0"
      disabled={isDisabled}
      onClick={onPreviousClick}
      aria-label="Previous event"
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
};
