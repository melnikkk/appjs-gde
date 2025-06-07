import { useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { Button } from '@/components/ui/button';
import { setCurrentEventId } from '@/infrastructure/store/slices/recordingEvents/slice';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import {
  selectCurrentEventIndex,
  selectEventsAmount,
  selectTrackerEvents,
} from '@/infrastructure/store/slices/recordingEvents/selectors';
import { setRecordingPauseTimestamp } from '@/infrastructure/store/slices/editor/slice';

export const NextRecordingEventButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentEventIndex = useAppSelector(selectCurrentEventIndex);
  const eventsAmount = useAppSelector(selectEventsAmount);
  const trackerEvents = useAppSelector(selectTrackerEvents);

  const maxEventIndex = eventsAmount - 1 > 0 ? eventsAmount - 1 : 0;
  const isDisabled = currentEventIndex >= maxEventIndex;

  const onClick = useCallback(() => {
    if (currentEventIndex < maxEventIndex && eventsAmount > 0) {
      const nextEventIndex = Math.min(currentEventIndex + 1, maxEventIndex);

      const nextEvent = trackerEvents[nextEventIndex];

      dispatch(setCurrentEventId(nextEvent.id));
      dispatch(setRecordingPauseTimestamp(nextEvent.timestamp));
    }
  }, [dispatch, currentEventIndex, maxEventIndex, eventsAmount, trackerEvents]);

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 p-0"
      onClick={onClick}
      disabled={isDisabled}
      aria-label="Next event"
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  );
};
