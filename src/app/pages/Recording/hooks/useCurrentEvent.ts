import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { Recording } from '@/domain/Recordings';
import { selectCurrentEventId } from '@/infrastructure/store/slices/recordingEvents/selectors';

export const useCurrentEvent = (recording: Recording) => {
  const currentEventId = useAppSelector(selectCurrentEventId);

  if (currentEventId) {
    const currentEvent = recording.events[currentEventId];

    return { currentEvent, currentEventId };
  }

  return { currentEvent: null, currentEventId };
};
