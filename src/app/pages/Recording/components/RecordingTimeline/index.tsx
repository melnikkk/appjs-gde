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
import { RecordingTimelineEvent } from './RecordingTimelineEvent';
import { MakeMagicButton } from '../MakeMagicButton';
import { RecordingTimelineEventSkeleton } from './RecordingTimelineEventSkeleton';
import { useGenerateAiRecordingEventsContentMutation } from '@/infrastructure/store/slices/recordingEvents/api';

interface Props {
  isLoading: boolean;
  startPointTimestamp: number;
  recording: Recording;
}

export const RecordingTimeline: React.FC<Props> = ({
  startPointTimestamp,
  recording,
  isLoading,
}) => {
  const [activeItem, setActiveItem] = useState('');

  const currentEventId = useAppSelector(selectCurrentEventId);
  const sortedEventIds = useAppSelector(selectSortedEventIds);
  const doesEventExist = useAppSelector(selectDoesRecordingEventExist(currentEventId));

  const [triggerGenerateAiRecordingEventsContent, { isLoading: isGeneratingAiContent }] =
    useGenerateAiRecordingEventsContentMutation();

  const onAiGenerateContentClick = () => {
    if (recording.id) {
      triggerGenerateAiRecordingEventsContent({ recordingId: recording.id });
    }
  };

  const renderSkeletons = () => {
    return [...Array(5)].map((_, index) => (
      <RecordingTimelineEventSkeleton key={`skeleton-${index}`} />
    ));
  };

  useEffect(() => {
    if (currentEventId && doesEventExist) {
      setActiveItem(`step-${currentEventId}`);
    } else {
      setActiveItem('');
    }
  }, [currentEventId, doesEventExist]);

  return (
    <div className="px-4 pt-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Recording Events</h2>
          <div className="text-muted-foreground text-sm">
            Detected events in the recording
          </div>
        </div>

        <MakeMagicButton onClick={onAiGenerateContentClick} />

        <AddEventDialog />
      </div>

      <ScrollArea className="h-[calc(100vh-180px)]">
        <Accordion
          type="single"
          collapsible
          value={activeItem}
          onValueChange={setActiveItem}
        >
          {isLoading ? (
            renderSkeletons()
          ) : (
            <>
              {isGeneratingAiContent
                ? sortedEventIds.map((eventId) => (
                    <RecordingTimelineEventSkeleton key={`skeleton-${eventId}`} />
                  ))
                : sortedEventIds.map((eventId, index) => (
                    <RecordingTimelineEvent
                      key={eventId}
                      id={eventId}
                      index={index}
                      startPointTimestamp={startPointTimestamp}
                      initialDimensions={recording.viewData}
                    />
                  ))}
            </>
          )}
        </Accordion>
      </ScrollArea>
    </div>
  );
};
