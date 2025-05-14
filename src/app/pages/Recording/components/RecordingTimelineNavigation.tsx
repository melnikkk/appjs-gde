import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import {
  selectCurrentEventIndex,
  selectEventsAmount,
  selectEventsCache,
} from '@/infrastructure/store/slices/editor/selectors';
import {
  setNextEventIndex,
  setPreviousEventIndex,
  setCurrentEventId,
} from '@/infrastructure/store/slices/editor/slice';

export const RecordingTimelineNavigation = () => {
  const dispatch = useAppDispatch();

  const currentEventIndex = useAppSelector(selectCurrentEventIndex);
  const eventsAmount = useAppSelector(selectEventsAmount);
  const eventsCache = useAppSelector(selectEventsCache);

  const maxEventIndex = eventsAmount - 1 > 0 ? eventsAmount - 1 : 0;

  const isPreviousButtonDisabled = currentEventIndex === 0;
  const isNextButtonDisabled = currentEventIndex >= maxEventIndex;

  const onPreviousClick = useCallback(() => {
    if (currentEventIndex > 0 && eventsAmount > 0) {
      const previousEventId = eventsCache[currentEventIndex - 1];

      if (previousEventId) {
        dispatch(setCurrentEventId(previousEventId));
        dispatch(setPreviousEventIndex());
      }
    }
  }, [dispatch, currentEventIndex, eventsAmount, eventsCache]);

  const onNextClick = useCallback(() => {
    if (currentEventIndex < maxEventIndex && eventsAmount > 0) {
      const nextEventId = eventsCache[currentEventIndex + 1];

      if (nextEventId) {
        dispatch(setCurrentEventId(nextEventId));
        dispatch(setNextEventIndex());
      }
    }
  }, [dispatch, currentEventIndex, maxEventIndex, eventsCache, eventsAmount]);

  return (
    <div className="flex space-x-2">
      <Button disabled={isPreviousButtonDisabled} onClick={onPreviousClick}>
        Previous
      </Button>
      <Button disabled={isNextButtonDisabled} onClick={onNextClick}>
        Next
      </Button>
    </div>
  );
};
