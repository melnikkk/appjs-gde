import { z } from 'zod';
import { RecordingEventType } from '@/domain/RecordingEvents/constants';

export const formSchema = z.object({
  time: z.number().min(0, { message: 'Time must be a positive number' }),
  type: z.nativeEnum(RecordingEventType),
});
