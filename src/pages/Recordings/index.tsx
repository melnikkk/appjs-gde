import { ScrollArea } from '@/shared/ui-kit/scroll-area';
import { useGetRecordingsQuery } from '@/entities/recording';
import { RecordingsList } from '@/widgets/recording/recordingsList';

export const RecordingsPage = () => {
  const { data: recordingsList, isLoading, error } = useGetRecordingsQuery();

  return (
    <div className="container p-5">
      <ScrollArea className="h-[calc(100vh-150px)]">
        {isLoading ? (
          <div className="flex justify-center p-8">Loading recordings...</div>
        ) : error ? (
          <div className="flex justify-center p-8 text-red-500">
            Error loading recordings
          </div>
        ) : (
          <RecordingsList recordings={recordingsList || []} />
        )}
      </ScrollArea>
    </div>
  );
};
