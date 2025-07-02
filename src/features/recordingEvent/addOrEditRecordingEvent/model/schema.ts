import { z } from 'zod';
import { RecordingEventType } from '@/entities/recordingEvent/lib/constants';

export const formSchema = z.object({
  time: z.number().min(0, { message: 'Time must be a positive number' }),
  type: z.nativeEnum(RecordingEventType),
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
});
