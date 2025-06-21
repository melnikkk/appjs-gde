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

interface Props {
  startPointTimestamp: number;
}

export const NextRecordingEventButton: React.FC<Props> = ({ startPointTimestamp }) => {
  const dispatch = useAppDispatch();

  const currentEventIndex = useAppSelector(selectCurrentEventIndex);
  const eventsAmount = useAppSelector(selectEventsAmount);
  const trackerEvents = useAppSelector(selectTrackerEvents);

  const onClick = useCallback(() => {
    if (eventsAmount > 0) {
      const nextEventIndex = (currentEventIndex + 1) % eventsAmount;
      const nextEvent = trackerEvents[nextEventIndex];
      const pauseTimestamp = nextEvent.timestamp - startPointTimestamp;

      dispatch(setCurrentEventId(nextEvent.id));
      dispatch(setRecordingPauseTimestamp(pauseTimestamp));
    }
  }, [dispatch, currentEventIndex, eventsAmount, trackerEvents]);

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 p-0"
      onClick={onClick}
      aria-label="Next event"
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  );
};
