import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useDeleteEventMutation } from '@/infrastructure/store/slices/recordingEvents/api';
import { useParams } from '@tanstack/react-router';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import {
  selectCurrentEventId,
  selectSortedEventIds,
} from '@/infrastructure/store/slices/recordingEvents/selectors';
import { setCurrentEventId } from '@/infrastructure/store/slices/recordingEvents/slice';

interface Props {
  eventId: string;
}

export const DeleteEventButton: React.FC<Props> = ({ eventId }) => {
  const { id: recordingId } = useParams({ strict: false });

  const dispatch = useAppDispatch();

  const currentEventId = useAppSelector(selectCurrentEventId);
  const sortedEventIds = useAppSelector(selectSortedEventIds);

  const [deleteEventTrigger, { isLoading }] = useDeleteEventMutation();

  const handleDeleteEventClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!recordingId || isLoading) {
      return;
    }

    const isCurrentEvent = eventId === currentEventId;
    const currentIndex = sortedEventIds.indexOf(eventId);

    let nextEventToSelect: string | null = null;

    if (isCurrentEvent && sortedEventIds.length > 1) {
      if (currentIndex < sortedEventIds.length - 1) {
        nextEventToSelect = sortedEventIds[currentIndex + 1];
      }

      if (currentIndex > 0) {
        nextEventToSelect = sortedEventIds[currentIndex - 1];
      }
    }

    try {
      await deleteEventTrigger({
        recordingId,
        eventId,
      }).unwrap();

      if (isCurrentEvent && nextEventToSelect) {
        dispatch(setCurrentEventId(nextEventToSelect));
      }

      toast.success('Event deleted successfully');
    } catch (error) {
      console.error('Failed to delete event:', error);

      toast.error('Failed to delete event');
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
