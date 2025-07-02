import { toast } from 'sonner';
import { useDeleteEventMutation } from '@/entities/recordingEvent/api/queries';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import {
  selectCurrentEventId,
  selectSortedEventIds,
} from '@/entities/recordingEvent/model/selectors';
import { setCurrentEventId } from '@/entities/recordingEvent/model/slice';

export const useDeleteRecordingEvent = () => {
  const dispatch = useAppDispatch();

  const currentEventId = useAppSelector(selectCurrentEventId);
  const sortedEventIds = useAppSelector(selectSortedEventIds);

  const [deleteEventTrigger, { isLoading }] = useDeleteEventMutation();

  const deleteEvent = async (recordingId: string, eventId: string) => {
    if (!recordingId || isLoading) {
      return Promise.reject(new Error('Invalid recording ID or already deleting'));
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

      return true;
    } catch (error) {
      toast.error('Failed to delete event');

      return Promise.reject(error);
    }
  };

  return {
    deleteEvent,
    isLoading,
  };
};
