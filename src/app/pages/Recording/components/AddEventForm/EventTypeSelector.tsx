import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RecordingEventType } from '@/domain/RecordingEvents/constants';
import { useFormContext } from 'react-hook-form';
import { AddEventFormValues } from './';

const OPTIONS = [
  {
    value: RecordingEventType.CLICK,
    label: 'Click',
  },
] as const;

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
