import { Link } from '@tanstack/react-router';
import { useGetRecordingsQuery } from '../../../infrastructure/slices/recordings/api';

export const RecordingsPage = () => {
  const { data: recordingsList } = useGetRecordingsQuery();

  return (
    <div>
      <h1>Recordings</h1>
      <ul>
        {recordingsList?.map((recording) => (
          <li key={recording.id}>
            <Link to={'/recordings/$id'} params={{ id: recording.id }}>
              {recording.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
