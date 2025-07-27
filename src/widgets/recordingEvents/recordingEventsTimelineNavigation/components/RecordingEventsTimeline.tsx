import { useEffect, useState } from 'react';
import { Accordion } from '@/shared/ui-kit/accordion';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import {
  selectCurrentEventId,
  selectDoesRecordingEventExist,
  selectSortedEventIds,
} from '@/entities/recordingEvent/model/selectors';
import { Recording } from '@/entities/recording/model/types';
import { ScrollArea } from '@/shared/ui-kit/scroll-area';
import { RecordingTimelineEvent } from './RecordingTimelineEvent';
import {
  MakeMagicButton,
  useGenerateAiContent,
} from '@/features/recordingEvent/generateAiContent';
import { RecordingTimelineEventSkeleton } from './RecordingTimelineEventSkeleton';
import { AddEventDialog } from '@/features/recordingEvent/addOrEditRecordingEvent/components/AddRecordingEventDialog';

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

  const { generateAiContent, isGeneratingAiContent } = useGenerateAiContent();

  const onAiGenerateContentClick = () => {
    if (recording.id) {
      generateAiContent(recording.id);
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

      <ScrollArea className="h-[calc(100vh-135px)]">
        <Accordion
          type="single"
          collapsible
          value={activeItem}
          onValueChange={setActiveItem}
        >
          {isLoading
            ? renderSkeletons()
            : isGeneratingAiContent
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
        </Accordion>
      </ScrollArea>
    </div>
  );
};
