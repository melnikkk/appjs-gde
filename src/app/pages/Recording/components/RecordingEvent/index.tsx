import { formatDuration } from '@/app/shared/utils';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import {
  selectCurrentEventId,
  selectRecordingEventsEntities,
} from '@/infrastructure/store/slices/recordingEvents/selectors';
import { setCurrentEventId } from '@/infrastructure/store/slices/recordingEvents/slice';
import { DeleteEventButton } from '../DeleteEventButton';
import { ScreenshotWithOverlay } from '../ScreenshotWithOverlay';
import { Dimensions } from '@/domain/Recordings';

interface Props {
  id: string;
  index: number;
  startPointTimestamp: number;
  initialDimensions: Dimensions;
}

export const RecordingEventComponent: React.FC<Props> = ({
  id,
  index,
  startPointTimestamp,
  initialDimensions,
}) => {
  const dispatch = useAppDispatch();

  const currentEventId = useAppSelector(selectCurrentEventId);
  const recordingEvents = useAppSelector(selectRecordingEventsEntities);

  const recordingEvent = recordingEvents?.[id];

  if (!recordingEvent) {
    return null;
  }

  const isFocused = currentEventId === id;
  const stepNumber = index + 1;

  const eventTime = formatDuration(recordingEvent.timestamp - startPointTimestamp);

  const hasCoordinates = Boolean(recordingEvent?.data?.coordinates);
  const recordingEventDescription = hasCoordinates
    ? `Clicked at coordinates (${recordingEvent.data.coordinates.x}, ${recordingEvent.data.coordinates.y})`
    : 'Click event (coordinates unavailable)';
  const recordingEventTitle = `Step ${stepNumber}: Click Event`;

  const handleEventClick = () => {
    dispatch(setCurrentEventId(id));
  };

  const hasScreenshot = Boolean(recordingEvent.screenshotUrl);
  const fullScreenshotUrl = hasScreenshot
    ? `${import.meta.env.VITE_BACKEND_URL}${recordingEvent.screenshotUrl}`
    : undefined;

  return (
    <AccordionItem
      value={`step-${id}`}
      className={`mb-3 overflow-hidden rounded-lg border !border-b border-solid transition-all duration-300 ${
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
          <div className="flex items-center gap-4">
            <div className="text-muted-foreground text-sm">{eventTime}</div>
            <DeleteEventButton eventId={id} />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pt-0 pb-3">
        <div className="ml-11">
          <p className="text-muted-foreground text-sm">{recordingEventDescription}</p>
          {hasScreenshot ? (
            fullScreenshotUrl ? (
              <ScreenshotWithOverlay
                initialDimensions={initialDimensions}
                screenshotUrl={fullScreenshotUrl}
                event={recordingEvent}
                alt={`Screenshot for ${recordingEventTitle}`}
                className="mt-4"
              />
            ) : null
          ) : null}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
