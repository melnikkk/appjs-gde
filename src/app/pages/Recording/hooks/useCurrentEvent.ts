import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { Recording } from '@/domain/Recordings';
import {
  selectCurrentEventIndex,
  selectCurrentEventId,
} from '@/infrastructure/store/slices/editor/selectors';

export const useCurrentEvent = (recording: Recording) => {
  const currentEventIndex = useAppSelector(selectCurrentEventIndex);
  const currentEventId = useAppSelector(selectCurrentEventId);

  if (currentEventId) {
    const currentEvent = recording.events[currentEventId];

    return { currentEvent, currentEventIndex, currentEventId };
  }

  return { currentEvent: null, currentEventIndex, currentEventId };
};
