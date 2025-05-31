import { useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RecordingEventType } from '@/domain/RecordingEvents/constants';
import { useAddEventDialog } from '@/app/pages/Recording/hooks/useAddEventDialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '@/app/pages/Recording/components/AddEventDialog/schema';
import { zodResolver } from '@hookform/resolvers/zod';

const customEventTypes = [
  {
    value: RecordingEventType.CLICK,
    label: 'Click',
  },
];

interface Props {
  isSubmitting?: boolean;
  isTimeFieldEditable?: boolean;
  className?: string;
  initialTime?: number;
  formattedTime?: string;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  onClose?: () => void;
}

export const AddEventForm: React.FC<Props> = ({
  onClose,
  className = '',
  initialTime,
  onSubmit: propOnSubmit,
  isSubmitting: propIsSubmitting,
  isTimeFieldEditable = true,
}) => {
  const {
    isOpen,
    setIsOpen,
    currentTime,
    addCustomEvent,
    isSubmitting: contextIsSubmitting,
  } = useAddEventDialog();

  const timeValue = initialTime ?? currentTime;
  const isLoading = propIsSubmitting ?? contextIsSubmitting ?? false;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      time: timeValue,
      type: RecordingEventType.CLICK,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (propOnSubmit) {
      propOnSubmit(values);
    } else {
      addCustomEvent(values);
    }

    form.reset();

    if (onClose) {
      onClose();
    } else if (setIsOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen || initialTime !== undefined) {
      form.setValue('time', timeValue);
    }
  }, [form, timeValue, isOpen, initialTime]);

  return (
    <Form {...form}>
      <form
        className={`space-y-4 ${className}`}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="w-10">Time</FormLabel>
              <div className="flex-1">
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      disabled={!isTimeFieldEditable}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.valueAsNumber;
                        if (!isNaN(value)) {
                          field.onChange(value);
                        }
                      }}
                      value={field.value || 0}
                      className="w-40"
                      min={0}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="w-10">Type</FormLabel>
              <div className="flex-1">
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-52">
                      {field.value && <SelectValue placeholder="Select event type" />}
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {customEventTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-2 pt-4">
          {onClose && (
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading} className={onClose ? '' : 'w-full'}>
            {isLoading ? 'Adding...' : 'Add Event'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const AddEventFormWithDialogClose = () => {
  const { setIsOpen } = useAddEventDialog();

  const onClose = () => setIsOpen(false);

  return <AddEventForm onClose={onClose} />;
};
