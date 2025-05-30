import { useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { Button } from '@/components/ui/button';
import { setCurrentEventIndex } from '@/infrastructure/store/slices/recordingEvents/slice';
import { TrackerEvents } from '@/app/pages/Recording/components/RecordingTimelineTracker/types';

interface Props {
  currentEventIndex: number;
  trackerEvents: TrackerEvents;
}

export const NextRecordingEventButton: React.FC<Props> = ({
  currentEventIndex,
  trackerEvents,
}) => {
  const dispatch = useAppDispatch();

  const eventsAmount = trackerEvents.length;
  const maxEventIndex = eventsAmount - 1 > 0 ? eventsAmount - 1 : 0;
  const isDisabled = currentEventIndex >= maxEventIndex;

  const onClick = useCallback(() => {
    if (currentEventIndex < maxEventIndex && eventsAmount > 0) {
      const nextEventIndex = Math.min(currentEventIndex + 1, maxEventIndex);
      const nextEventId = trackerEvents[nextEventIndex];

      if (nextEventId) {
        dispatch(setCurrentEventIndex(nextEventIndex));
      }
    }
  }, [dispatch, currentEventIndex, maxEventIndex, trackerEvents, eventsAmount]);

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 p-0"
      disabled={isDisabled}
      onClick={onClick}
      aria-label="Next event"
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  );
};
