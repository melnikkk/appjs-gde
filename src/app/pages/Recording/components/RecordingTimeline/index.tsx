import { PlusIcon } from 'lucide-react';
import { RecordingEvents } from '@/domain/RecordingEvents';
import { Accordion } from '@/components/ui/accordion';
import { RecordingEventComponent } from '../RecordingEvent';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import {
  selectCurrentEventIndex,
  selectCurrentEventId,
  selectSortedEventIds,
} from '@/infrastructure/store/slices/editor/selectors';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { useEffect, useState } from 'react';
import { RecordingEventsProvider } from '../../context/RecordingEventsContext';

interface Props {
  startPointTimestamp: string;
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

  const handleAddStep = () => {
    console.log('Add step clicked');
  };

  return (
    <div className="mt-4 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recording Events Timeline</h2>
        <button
          onClick={handleAddStep}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1 rounded-md p-2 text-sm transition-colors"
        >
          <PlusIcon className="h-4 w-4" />
          Add step
        </button>
      </div>

      <div className="text-muted-foreground mb-4 text-sm">
        Detected events in the recording
      </div>
      <RecordingEventsProvider recordingEvents={recordingEvents}>
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
      </RecordingEventsProvider>
    </div>
  );
};
