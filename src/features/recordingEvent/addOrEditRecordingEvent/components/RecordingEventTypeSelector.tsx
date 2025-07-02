import { FormControl, FormItem, FormLabel, FormMessage } from '@/shared/ui-kit/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui-kit/select';
import { RecordingEventType } from '@/entities/recordingEvent/lib/constants';
import { useFormContext } from 'react-hook-form';
import { AddEventFormValues } from './AddRecordingEventForm';
import { OPTIONS } from '../model/constants';

export const EventTypeSelector = () => {
  const form = useFormContext<AddEventFormValues>();

  return (
    <FormItem className="flex-1">
      <FormLabel>Event type:</FormLabel>
      <FormControl>
        <Select
          onValueChange={(value) => form.setValue('type', value as RecordingEventType)}
          defaultValue={form.getValues('type')}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select event type" />
          </SelectTrigger>
          <SelectContent>
            {OPTIONS.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
