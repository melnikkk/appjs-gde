import { useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
import { useGetRecordingQuery } from '@/infrastructure/store/slices/recordings/api';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { Separator } from '@/components/ui/separator';
import { Sidebar, SidebarContent, SidebarProvider } from '@/components/ui/sidebar';
import { useMediaDimensions } from '@/app/pages/Recording/hooks/useMediaDimensions';
import { useGetEventsQuery } from '@/infrastructure/store/slices/recordingEvents/api';
import { setCurrentRecordingId } from '@/infrastructure/store/slices/recordings/slice';
import { RecordingTimeline } from './components/RecordingTimeline';
import { RecordingTimelineNavigation } from './components/RecordingTimelineNavigation';
import { RecordingPlayer } from './RecordingPlayer';
import { ErrorMessage } from '@/components/ui/error/error-message';
import { ErrorBoundary } from '@/components/ui/error/error-boundary';
import { useRtkQueryErrorHandler } from '@/hooks/error';

export const RecordingPage = () => {
  // useWebSocketConnection();
  const dispatch = useAppDispatch();

  const { mediaRef, handleMediaLoad, dimensions } = useMediaDimensions();
  const videoRef = mediaRef as React.RefObject<HTMLVideoElement>;

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
              <RecordingPlayer
                recording={recording}
                dimensions={dimensions}
                videoRef={videoRef}
                handleMediaLoad={handleMediaLoad}
              />

              <Separator className="my-4" />

              <RecordingTimelineNavigation
                startPointTimestamp={recording.startTime}
                endPointTimestamp={recording.stopTime}
                duration={recording.duration}
                initialRecordingDimensions={recording.viewData}
                currentRecordingDimensions={dimensions}
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
