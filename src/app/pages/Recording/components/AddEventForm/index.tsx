import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RecordingEventType } from '@/domain/RecordingEvents/constants';
import { EventTypeSelector } from './EventTypeSelector';
import { formSchema } from './schema';
import {
  EventFormMode,
  SUBMIT_BUTTON_LOADING_TEXT_BY_MODE,
  SUBMIT_BUTTON_TEXT_BY_MODE,
} from './constants';

export interface AddEventFormValues {
  time: number;
  type: RecordingEventType;
}

interface Props {
  isSubmitting?: boolean;
  isTimeFieldEditable?: boolean;
  className?: string;
  initialValues?: Partial<AddEventFormValues>;
  mode?: EventFormMode;
  onSubmit: (values: AddEventFormValues) => void;
}

export const AddEventForm: React.FC<Props> = ({
  isSubmitting = false,
  isTimeFieldEditable = true,
  className = '',
  mode = EventFormMode.CREATE,
  initialValues,
  onSubmit,
}) => {
  const form = useForm<AddEventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      time: initialValues?.time ?? 0,
      type: initialValues?.type ?? RecordingEventType.CLICK,
    },
  });

  useEffect(() => {
    if (initialValues?.time !== undefined) {
      form.setValue('time', initialValues.time);
    }

    if (initialValues?.type) {
      form.setValue('type', initialValues.type);
    }
  }, [form, initialValues]);

  const handleSubmit = (values: AddEventFormValues) => {
    onSubmit(values);

    if (mode === EventFormMode.CREATE) {
      form.reset();
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className={cn('space-y-4', className)}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name="time"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time (milliseconds)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="100"
                  disabled={!isTimeFieldEditable}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="type"
          control={form.control}
          render={() => <EventTypeSelector />}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? SUBMIT_BUTTON_LOADING_TEXT_BY_MODE[mode]
              : SUBMIT_BUTTON_TEXT_BY_MODE[mode]}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
