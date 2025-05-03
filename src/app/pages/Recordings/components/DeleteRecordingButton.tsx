import { Button } from '@/components/ui/button';
import { useDeleteRecordingMutation } from '@/infrastructure/store/slices/recordings/api';
import { Trash2 } from 'lucide-react';

interface Props {
  id: string;
}

export const DeleteRecordingButton: React.FC<Props> = ({ id }) => {
  const [deleteRecordingTrigger] = useDeleteRecordingMutation();

  const handleDeleteRecordingClick = (e: React.MouseEvent) => {
    e.preventDefault();

    deleteRecordingTrigger({ id });
  };

  return (
    <Button
      className="absolute top-3 right-3 z-1 h-8 w-8 cursor-pointer bg-white/70 p-0 text-black opacity-0 transition duration-200 group-hover:opacity-100"
      variant="ghost"
      size="icon"
      onClick={handleDeleteRecordingClick}
    >
      <Trash2 className="h-5 w-5" />
    </Button>
  );
};
