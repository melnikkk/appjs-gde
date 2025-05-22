import { RecordingEvents } from '@/domain/RecordingEvents';
import { Accordion } from '@/components/ui/accordion';
import { RecordingEventComponent } from '../RecordingEvent';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import {
  selectCurrentEventIndex,
  selectCurrentEventId,
  selectSortedEventIds,
} from '@/infrastructure/store/slices/recordingEvents/selectors';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { useEffect, useState } from 'react';

interface Props {
  startPointTimestamp: number;
  recordingEvents: RecordingEvents;
}

export const RecordingTimeline: React.FC<Props> = ({
  recordingEvents,
  startPointTimestamp,
}) => {
  const dispatch = useAppDispatch();

  const currentEventIndex = useAppSelector(selectCurrentEventIndex);
  const currentEventId = useAppSelector(selectCurrentEventId);
  const sortedEventIds = useAppSelector(selectSortedEventIds);

  const [activeItem, setActiveItem] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (currentEventId && recordingEvents[currentEventId]) {
      setActiveItem(`step-${currentEventId}`);
    }
  }, [currentEventIndex, currentEventId, recordingEvents, dispatch]);

  return (
    <div className="mt-4 rounded-lg border p-4">
      <h2 className="text-lg font-semibold">Recording Events Timeline</h2>

      <div className="text-muted-foreground mb-4 text-sm">
        Detected events in the recording
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={activeItem}
        onValueChange={setActiveItem}
      >
        {sortedEventIds.map((eventId, index) => (
          <RecordingEventComponent
            key={eventId}
            id={eventId}
            index={index}
            startPointTimestamp={startPointTimestamp}
          />
        ))}
      </Accordion>
    </div>
  );
};
