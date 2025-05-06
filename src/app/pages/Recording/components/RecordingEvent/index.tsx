import { formatDuration } from '@/app/shared/utils';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { RecordingEvent } from '@/domain/RecordingEvents';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { selectCurrentEventIndex } from '@/infrastructure/store/slices/editor/selectors';
import { setCurrentEventIndex } from '@/infrastructure/store/slices/editor/slice';

interface Props {
  startPointTimestamp: string;
  stepNumber: number;
  recordingEvent: RecordingEvent;
}

export const RecordingEventComponent: React.FC<Props> = ({
  recordingEvent,
  stepNumber,
  startPointTimestamp,
}) => {
  const dispatch = useAppDispatch();

  const currentEventIndex = useAppSelector(selectCurrentEventIndex);
  const isFocused = stepNumber - 1 === currentEventIndex;

  const eventTime = formatDuration(
    Number(recordingEvent.timestamp) - Number(startPointTimestamp),
  );
  const recordingEventDescription = `Clicked at coordinates (${recordingEvent.data.coordinates.x}, ${recordingEvent.data.coordinates.y})`;
  const recordingEventTitle = `Step ${stepNumber}: Click Event`;

  const handleEventClick = () => {
    dispatch(setCurrentEventIndex(stepNumber - 1));
  };

  return (
    <AccordionItem
      value={`step-${recordingEvent.id}`}
      className={`mb-3 overflow-hidden rounded-lg border border-solid !border-b transition-all duration-300 ${
        isFocused ? 'border-primary bg-primary/5 ring-primary/20 ring-2' : ''
      }`}
      onClick={handleEventClick}
    >
      <AccordionTrigger className="cursor-pointer items-center p-3 hover:no-underline">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <div
              className={`mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                isFocused ? 'bg-primary text-primary-foreground' : 'bg-black text-white'
              }`}
            >
              {stepNumber}
            </div>
            <div>
              <h3 className="font-semibold">{recordingEventTitle}</h3>
              <p className="text-muted-foreground text-sm">
                Here should be an event description :)
              </p>
            </div>
          </div>
          <div className="text-muted-foreground text-sm">{eventTime}</div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pt-0 pb-3">
        <div className="ml-11">
          <p className="text-muted-foreground text-sm">{recordingEventDescription}</p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
