import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useDeleteEventMutation } from '@/infrastructure/store/slices/recordingEvents/api';
import { useParams } from '@tanstack/react-router';

interface Props {
  eventId: string;
}

export const DeleteEventButton: React.FC<Props> = ({ eventId }) => {
  const { id: recordingId } = useParams({ strict: false });

  const [deleteEventTrigger, { isLoading }] = useDeleteEventMutation();

  const handleDeleteEventClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!recordingId || isLoading) {
      return;
    }

    try {
      await deleteEventTrigger({
        recordingId,
        eventId,
      }).unwrap();

      toast.success('Event deleted successfully');
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  return (
    <Button
      className="bg-background hover:bg-background/80 text-muted-foreground hover:text-destructive hover:border-destructive/30 h-8 w-8 cursor-pointer rounded-md border p-0 transition duration-200"
      variant="ghost"
      size="icon"
      onClick={handleDeleteEventClick}
      disabled={isLoading}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};
