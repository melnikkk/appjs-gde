import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogClose } from '@radix-ui/react-dialog';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RecordingEventType } from '@/domain/RecordingEvents/constants';
import { useAddEventDialog } from '../../hooks/useAddEventDialog';
import { AddEventDialogTrigger } from '../AddEventDialogTrigger';
import { formSchema } from './schema';
import { AddEventDialogProvider } from '../../contexts/AddEventDialogContext';

const customEventTypes = [
  {
    value: RecordingEventType.CLICK,
    label: 'Click',
  },
];

export const AddEventDialogComponent = () => {
  const { isOpen, setIsOpen, currentTime, formattedTime, addCustomEvent, isSubmitting } =
    useAddEventDialog();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      time: currentTime,
      type: RecordingEventType.CLICK,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addCustomEvent(values);

    form.reset();
  }

  useEffect(() => {
    if (isOpen) {
      form.setValue('time', currentTime);
    }
  }, [form, currentTime, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <AddEventDialogTrigger />
      <DialogContent
        className="sm:max-w-[500px]"
        onEscapeKeyDown={() => setIsOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Add Custom Event</DialogTitle>
        </DialogHeader>

        <div className="pb-4">
          <div className="text-muted-foreground mb-4">
            Add a custom event at the current timestamp in the recording.
          </div>

          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                          <div className="text-muted-foreground">{formattedTime}</div>
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
                            {field.value && (
                              <SelectValue placeholder="Select event type" />
                            )}
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

              {/* ======== TBD ======== */}
              {/* <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <FormLabel className="w-24">Title</FormLabel>
                    <div className="flex-1">
                      <FormControl>
                        <Input {...field} placeholder="Event title" autoComplete="off" />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              /> */}

              {/* ======== TBD ======== */}
              {/* <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <FormLabel className="w-24">Description</FormLabel>
                    <div className="flex-1">
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          placeholder="Add a description (optional)"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              /> */}

              <div className="flex justify-between gap-2 pt-4">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setIsOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add Event'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface Props {
  currentTime?: number;
}

export const AddEventDialog: React.FC<Props> = ({ currentTime = 0 }) => {
  return (
    <AddEventDialogProvider currentTime={currentTime}>
      <AddEventDialogComponent />
    </AddEventDialogProvider>
  );
};
