import { RecordingCard, Recordings } from '@/entities/recording';
import { DefaultRecordingsPlaceholder } from './DefaultRecordingsPlaceholder';
import { DeleteRecordingButton } from '@/features/recording/deleteRecording';

interface Props {
  recordings: Recordings;
}

export const RecordingsList: React.FC<Props> = ({ recordings }) => {
  if (!recordings || recordings.length === 0) {
    return <DefaultRecordingsPlaceholder />;
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recordings.map((recording) => (
        <RecordingCard
          key={recording.id}
          id={recording.id}
          name={recording.name}
          duration={recording.duration}
          createdAt={recording.createdAt}
          thumbnailUrl={recording.thumbnailUrl}
          eventsCount={Object.keys(recording.events).length}
          DeleteButtonPort={DeleteRecordingButton}
        />
      ))}
    </div>
  );
};
