import { useCallback } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { setCurrentEventId } from '@/infrastructure/store/slices/recordingEvents/slice';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import {
  selectCurrentEventIndex,
  selectEventsAmount,
  selectTrackerEvents,
} from '@/infrastructure/store/slices/recordingEvents/selectors';
import { setRecordingPauseTimestamp } from '@/infrastructure/store/slices/editor/slice';

export const PreviousRecordingEventButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentEventIndex = useAppSelector(selectCurrentEventIndex);
  const eventsAmount = useAppSelector(selectEventsAmount);
  const trackerEvents = useAppSelector(selectTrackerEvents);

  const onPreviousClick = useCallback(() => {
    if (eventsAmount > 0) {
      if (currentEventIndex === -1) {
        const lastEventIndex = eventsAmount - 1;
        const lastEvent = trackerEvents[lastEventIndex];

        dispatch(setCurrentEventId(lastEvent.id));
        dispatch(setRecordingPauseTimestamp(lastEvent.timestamp));

        return;
      }

      const previousEventIndex = (currentEventIndex - 1 + eventsAmount) % eventsAmount;
      const previousEvent = trackerEvents[previousEventIndex];

      dispatch(setCurrentEventId(previousEvent.id));
      dispatch(setRecordingPauseTimestamp(previousEvent.timestamp));
    }
  }, [dispatch, currentEventIndex, eventsAmount, trackerEvents]);

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 p-0"
      onClick={onPreviousClick}
      aria-label="Previous event"
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
};
