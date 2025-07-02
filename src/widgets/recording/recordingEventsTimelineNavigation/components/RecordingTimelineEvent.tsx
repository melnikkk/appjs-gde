import { formatDuration } from '@/shared/lib/time-utils';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/shared/ui-kit/accordion';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import {
  selectCurrentEventId,
  selectRecordingEventsEntities,
} from '@/entities/recordingEvent/model/selectors';
import { setCurrentEventId } from '@/entities/recordingEvent/model/slice';
import { DeleteEventButton } from '../../../../features/recordingEvent/deleteRecordingEvent/components/DeleteRecoringEventButton';
import { ScreenshotWithOverlay } from '../../../../pages/recording/components/ScreenshotWithOverlay';
import { Dimensions } from '@/shared/types';

interface Props {
  id: string;
  index: number;
  startPointTimestamp: number;
  initialDimensions: Dimensions;
}

export const RecordingTimelineEvent: React.FC<Props> = ({
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
  const coordinatesInfo = `Clicked at coordinates (${hasCoordinates ? `${recordingEvent.data.coordinates.x}, ${recordingEvent.data.coordinates.y}` : 'coordinates unavailable'})`;

  const recordingEventTitle = `Step ${stepNumber}: ${recordingEvent.title ?? 'Click Event'}`;
  const recordingEventDescription = recordingEvent.description ?? coordinatesInfo;

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
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-muted-foreground text-sm">{eventTime}</div>
            <DeleteEventButton eventId={id} />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pt-0 pb-3">
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
      </AccordionContent>
    </AccordionItem>
  );
};
