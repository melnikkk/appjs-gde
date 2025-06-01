import { useEffect, useState } from 'react';
import { RecordingEvents } from '@/domain/RecordingEvents';
import { Accordion } from '@/components/ui/accordion';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import {
  selectCurrentEventId,
  selectSortedEventIds,
} from '@/infrastructure/store/slices/recordingEvents/selectors';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { AddEventDialog } from '@/app/pages/Recording/components/AddEventDialog';
import { RecordingEventComponent } from '../RecordingEvent';
import { Recording } from '@/domain/Recordings';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Props {
  startPointTimestamp: number;
  recordingEvents: RecordingEvents;
  recording: Recording;
}

export const RecordingTimeline: React.FC<Props> = ({
  recordingEvents,
  startPointTimestamp,
  recording,
}) => {
  const dispatch = useAppDispatch();

  const currentEventId = useAppSelector(selectCurrentEventId);
  const sortedEventIds = useAppSelector(selectSortedEventIds);

  const [activeItem, setActiveItem] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (currentEventId && recordingEvents[currentEventId]) {
      setActiveItem(`step-${currentEventId}`);
    }
  }, [currentEventId, recordingEvents, dispatch]);

  return (
    <div className="px-2 pt-3">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Recording Events</h2>
          <div className="text-muted-foreground text-sm">
            Detected events in the recording
          </div>
        </div>

        <AddEventDialog />
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={activeItem}
        onValueChange={setActiveItem}
      >
        <ScrollArea>
          {sortedEventIds.map((eventId, index) => (
            <RecordingEventComponent
              key={eventId}
              id={eventId}
              index={index}
              startPointTimestamp={startPointTimestamp}
              initialDimensions={recording.viewData}
            />
          ))}
        </ScrollArea>
      </Accordion>
    </div>
  );
};
