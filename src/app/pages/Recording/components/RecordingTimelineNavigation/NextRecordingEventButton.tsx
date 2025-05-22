import { useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { Button } from '@/components/ui/button';
import {
  setCurrentEventId,
  setNextEventIndex,
} from '@/infrastructure/store/slices/recordingEvents/slice';
import { EventsCache } from '@/infrastructure/store/slices/recordingEvents/types';

interface Props {
  currentEventIndex: number;
  eventsAmount: number;
  eventsCache: EventsCache;
}

export const NextRecordingEventButton: React.FC<Props> = ({
  currentEventIndex,
  eventsAmount,
  eventsCache,
}) => {
  const dispatch = useAppDispatch();

  const maxEventIndex = eventsAmount - 1 > 0 ? eventsAmount - 1 : 0;
  const isDisabled = currentEventIndex >= maxEventIndex;

  const onClick = useCallback(() => {
    if (currentEventIndex < maxEventIndex && eventsAmount > 0) {
      const nextEventId = eventsCache[currentEventIndex + 1];

      if (nextEventId) {
        dispatch(setCurrentEventId(nextEventId));
        dispatch(setNextEventIndex());
      }
    }
  }, [dispatch, currentEventIndex, maxEventIndex, eventsCache, eventsAmount]);

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
