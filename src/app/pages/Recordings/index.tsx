import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetRecordingsQuery } from '@/infrastructure/store/slices/recordings/api';
import { RecordingsList } from './components/RecordingsList';

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
