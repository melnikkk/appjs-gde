import { Trash2 } from 'lucide-react';
import { useParams } from '@tanstack/react-router';
import { useDeleteRecordingEvent } from '../model/useDeleteRecordingEvent';

interface Props {
  eventId: string;
}

export const DeleteEventButton: React.FC<Props> = ({ eventId }) => {
  const { id: recordingId } = useParams({ strict: false });

  const { deleteEvent, isLoading } = useDeleteRecordingEvent();

  const handleDeleteEventClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!recordingId) {
      return;
    }

    try {
      await deleteEvent(recordingId, eventId);
    } catch (error) {
      console.error('Delete event error:', error);
    }
  };

  return (
    <div
      className="bg-background hover:bg-background/80 text-muted-foreground hover:text-destructive hover:border-destructive/30 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border p-0 transition duration-200"
      onClick={handleDeleteEventClick}
      role="button"
      aria-label="Delete event"
      style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
    >
      <Trash2 className="h-4 w-4" />
    </div>
  );
};
