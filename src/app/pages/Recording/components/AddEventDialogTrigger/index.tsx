import { DialogTrigger } from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAddEventDialog } from '../../hooks/useAddEventDialog';

export const AddEventDialogTrigger = () => {
  const { setIsOpen } = useAddEventDialog();

  return (
    <DialogTrigger asChild>
      <Button className="flex items-center gap-1.5" onClick={() => setIsOpen(true)}>
        <PlusIcon className="h-4 w-4" />
      </Button>
    </DialogTrigger>
  );
};
