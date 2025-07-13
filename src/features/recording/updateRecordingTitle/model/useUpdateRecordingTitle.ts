import { toast } from 'sonner';
import { useUpdateRecordingMutation } from '@/entities/recording';

export const useUpdateRecordingTitle = () => {
  const [updateRecordingTrigger, { isLoading }] = useUpdateRecordingMutation();

  const updateRecordingTitle = async (id: string, name: string) => {
    if (!id) {
      return Promise.reject(new Error('Invalid recording ID or already updating'));
    }

    if (isLoading) {
      toast.info('Updating recording title, please wait...');

      return false;
    }

    try {
      await updateRecordingTrigger({ id, name }).unwrap();

      toast.success('Recording title updated successfully');

      return true;
    } catch (error) {
      toast.error('Failed to update recording title');

      console.error('Error updating recording title:', error);

      return false;
    }
  };

  return {
    updateRecordingTitle,
    isUpdatingTitle: isLoading,
  };
};
