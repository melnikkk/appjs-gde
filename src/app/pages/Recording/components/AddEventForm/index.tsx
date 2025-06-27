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
import { Textarea } from '@/components/ui/textarea';
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
  title: string;
  description?: string;
  type: RecordingEventType;
}

interface Props {
  isSubmitting?: boolean;
  isTimeFieldEditable?: boolean;
  className?: string;
  initialValues?: Partial<AddEventFormValues>;
  mode?: EventFormMode;
  onSubmit: (values: AddEventFormValues) => void;
  onCancel?: () => void;
}

export const AddEventForm: React.FC<Props> = ({
  isSubmitting = false,
  isTimeFieldEditable = true,
  className = '',
  mode = EventFormMode.CREATE,
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<AddEventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      time: initialValues?.time ?? 0,
      type: initialValues?.type ?? RecordingEventType.CLICK,
      title: initialValues?.title ?? '',
      description: initialValues?.description ?? '',
    },
  });

  useEffect(() => {
    if (initialValues?.time !== undefined) {
      form.setValue('time', initialValues.time);
    }

    if (initialValues?.type) {
      form.setValue('type', initialValues.type);
    }

    if (initialValues?.title) {
      form.setValue('title', initialValues.title);
    }

    if (initialValues?.description) {
      form.setValue('description', initialValues.description);
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
        className={cn('mt-2 space-y-4', className)}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-row gap-4">
          <FormField name="type" control={form.control} render={EventTypeSelector} />

          <FormField
            name="time"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Time (milliseconds):</FormLabel>
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
        </div>

        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title:</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter event title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description:</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter event description (optional)"
                  className="min-h-[80px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between space-x-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onCancel?.()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
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
