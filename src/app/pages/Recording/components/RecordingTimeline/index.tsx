import { useEffect, useState } from 'react';
import { Accordion } from '@/components/ui/accordion';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import {
  selectCurrentEventId,
  selectDoesRecordingEventExist,
  selectSortedEventIds,
} from '@/infrastructure/store/slices/recordingEvents/selectors';
import { AddEventDialog } from '@/app/pages/Recording/components/AddEventDialog';
import { Recording } from '@/domain/Recordings';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RecordingEventComponent } from '../RecordingEvent';

interface Props {
  startPointTimestamp: number;
  recording: Recording;
}

export const RecordingTimeline: React.FC<Props> = ({
  startPointTimestamp,
  recording,
}) => {
  const currentEventId = useAppSelector(selectCurrentEventId);
  const sortedEventIds = useAppSelector(selectSortedEventIds);
  const doesEventExist = useAppSelector(selectDoesRecordingEventExist(currentEventId));

  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    if (currentEventId && doesEventExist) {
      setActiveItem(`step-${currentEventId}`);
    } else {
      setActiveItem('');
    }
  }, [currentEventId, doesEventExist]);

  return (
    <div className="p-4">
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
