import { useGenerateAiRecordingEventsContentMutation } from '@/entities/recordingEvent/api/queries';

export const useGenerateAiContent = () => {
  const [triggerGenerateAiRecordingEventsContent, { isLoading: isGeneratingAiContent }] =
    useGenerateAiRecordingEventsContentMutation();

  const generateAiContent = async (recordingId: string) => {
    if (recordingId) {
      return await triggerGenerateAiRecordingEventsContent({ recordingId }).unwrap();
    }

    return Promise.reject(new Error('No recording ID provided'));
  };

  return {
    generateAiContent,
    isGeneratingAiContent,
  };
};
