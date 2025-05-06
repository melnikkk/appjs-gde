import { PlusIcon } from 'lucide-react';
import { RecordingEvents } from '@/domain/RecordingEvents';
import { Accordion } from '@/components/ui/accordion';
import { RecordingEventComponent } from '../RecordingEvent';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { selectCurrentEventIndex } from '@/infrastructure/store/slices/editor/selectors';
import { useEffect, useState } from 'react';

interface Props {
  startPointTimestamp: string;
  recordingEvents: RecordingEvents;
}

export const RecordingTimeline: React.FC<Props> = ({
  recordingEvents,
  startPointTimestamp,
}) => {
  const currentEventIndex = useAppSelector(selectCurrentEventIndex);
  const [activeItem, setActiveItem] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (recordingEvents[currentEventIndex]) {
      setActiveItem(`step-${recordingEvents[currentEventIndex].id}`);
    }
  }, [currentEventIndex, recordingEvents]);

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
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={activeItem}
        onValueChange={setActiveItem}
      >
        {recordingEvents.map((event, index) => (
          <RecordingEventComponent
            key={event.id}
            recordingEvent={event}
            stepNumber={index + 1}
            startPointTimestamp={startPointTimestamp}
          />
        ))}
      </Accordion>
    </div>
  );
};
