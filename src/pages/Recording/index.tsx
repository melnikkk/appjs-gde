import { useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
import { useGetRecordingQuery } from '@/entities/recording/api/queries';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Separator } from '@/shared/ui-kit/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  useSidebar,
} from '@/shared/ui-kit/sidebar';
import { useGetEventsQuery } from '@/entities/recordingEvent/api/queries';
import { setCurrentRecordingId } from '@/entities/recording/model/slice';
import { RecordingTimeline } from '@/widgets/recordingEvents/recordingEventsTimelineNavigation/components/RecordingEventsTimeline';
import { RecordingTimelineNavigation } from '@/widgets/recordingEvents/recordingTimelineTracker';
import { RecordingPlayer } from '@/widgets/recording/recordingPlayer';
import { ErrorMessage } from '@/shared/ui-kit/error/error-message';
import { ErrorBoundary } from '@/shared/ui-kit/error/error-boundary';
import { useRtkQueryErrorHandler } from '@/shared/hooks/useRtkQueryErrorHandler';

export const RecordingPage = () => {
  const { setOpen } = useSidebar();

  useEffect(() => {
    setOpen(false);
  }, [setOpen]);

  // useWebSocketConnection();
  const dispatch = useAppDispatch();

  const { id } = useParams({ strict: false });

  const { error, isError, handleRtkQueryError, clearError } = useRtkQueryErrorHandler();

  const {
    data: recording,
    isLoading: isLoadingRecording,
    error: recordingError,
    refetch: refetchRecording,
  } = useGetRecordingQuery(
    {
      id: id as string,
    },
    {
      skip: !id,
    },
  );

  const {
    isLoading: isLoadingEvents,
    error: eventsError,
    refetch: refetchEvents,
  } = useGetEventsQuery(
    {
      recordingId: id as string,
    },
    {
      skip: !id,
    },
  );

  const isLoading = isLoadingRecording || isLoadingEvents;

  useEffect(() => {
    if (recordingError) {
      handleRtkQueryError(recordingError);
    } else if (eventsError) {
      handleRtkQueryError(eventsError);
    }
  }, [recordingError, eventsError, handleRtkQueryError]);

  useEffect(() => {
    if (id) {
      dispatch(setCurrentRecordingId(id));
    }

    return () => {
      dispatch(setCurrentRecordingId(null));
    };
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="mt-4 text-lg">Loading recording...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    const handleRetry = () => {
      clearError();

      if (recordingError) {
        refetchRecording();
      }

      if (eventsError) {
        refetchEvents();
      }
    };

    return (
      <div className="flex h-full items-center justify-center p-4">
        <ErrorMessage
          title="Failed to load recording"
          message={error?.message || 'There was a problem loading this recording.'}
          onRetry={handleRetry}
          className="max-w-lg"
        />
      </div>
    );
  }

  if (!recording) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <ErrorMessage
          title="Recording not found"
          message="The recording you're looking for doesn't exist or has been removed."
          className="max-w-lg"
        />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex h-full">
        <SidebarProvider
          style={
            {
              '--sidebar-width': '350px',
              '--sidebar-width-mobile': '300px',
            } as React.CSSProperties
          }
          className="min-h-fit"
        >
          <div className="flex-1 px-3 pt-3">
            <div className="rounded-lg border p-4">
              <RecordingPlayer recording={recording} />

              <Separator className="my-4" />

              <RecordingTimelineNavigation
                startPointTimestamp={recording.startTime}
                endPointTimestamp={recording.stopTime}
                duration={recording.duration}
              />
            </div>
          </div>

          <Sidebar side="right" collapsible="none" className="border-l">
            <SidebarContent>
              <RecordingTimeline
                recording={recording}
                startPointTimestamp={recording.startTime}
                isLoading={isLoading}
              />
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      </div>
    </ErrorBoundary>
  );
};
