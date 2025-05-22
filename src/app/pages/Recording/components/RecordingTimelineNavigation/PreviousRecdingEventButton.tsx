import { useCallback } from 'react';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import {
  setCurrentEventId,
  setPreviousEventIndex,
} from '@/infrastructure/store/slices/editor/slice';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { EventsCache } from '@/infrastructure/store/slices/editor/types';

interface Props {
  currentEventIndex: number;
  eventsAmount: number;
  eventsCache: EventsCache;
}

export const PreviousRecordingEventButton: React.FC<Props> = ({
  currentEventIndex,
  eventsAmount,
  eventsCache,
}) => {
  const dispatch = useAppDispatch();

  const isDisabled = currentEventIndex === 0;

  const onPreviousClick = useCallback(() => {
    if (currentEventIndex > 0 && eventsAmount > 0) {
      const previousEventId = eventsCache[currentEventIndex - 1];

      if (previousEventId) {
        dispatch(setCurrentEventId(previousEventId));
        dispatch(setPreviousEventIndex());
      }
    }
  }, [dispatch, currentEventIndex, eventsAmount, eventsCache]);

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
