import React, { createContext, ReactNode, useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { v4 as uuidv4 } from 'uuid';
import {
  useAddEventsMutation,
  useEditRecordingEventMutation,
} from '@/entities/recordingEvent/api/queries';
import {
  DEFAULT_RECORDING_EVENT_COORDINATES,
  RecordingEventType,
} from '@/entities/recordingEvent/lib/constants';
import { toast } from 'sonner';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { selectCurrentEvent } from '@/entities/recordingEvent/model/selectors';
import { selectCurrentRecordingStartTimestamp } from '@/entities/recording/model/selectors';

interface Props {
  children: ReactNode;
}

export const AddEventDialogProvider: React.FC<Props> = ({ children }) => {
  const { id: recordingId } = useParams({ strict: false });

  const [isOpen, setIsOpen] = useState(false);

  const currentEvent = useAppSelector(selectCurrentEvent);
  const currentRecordingStartTimestamp = useAppSelector(
    selectCurrentRecordingStartTimestamp,
  );

  const [triggerAddEvents, { isLoading: isAddRecordingEventSubmitting }] =
    useAddEventsMutation();
  const [triggerUpdateRecordingEvent, { isLoading: isEditRecordingEventSubmitting }] =
    useEditRecordingEventMutation();

  const isLoading = isAddRecordingEventSubmitting || isEditRecordingEventSubmitting;

  const editExistingEvent = async (values: EventFormData) => {
    if (!recordingId || !currentEvent || !currentRecordingStartTimestamp) {
      toast.error('Failed to edit event. Please try again.');

      setIsOpen(false);

      return;
    }

    try {
      await triggerUpdateRecordingEvent({
        recordingId,
        eventId: currentEvent.id,
        event: {
          id: currentEvent.id,
          timestamp: currentRecordingStartTimestamp + values.time,
          type: values.type,
          title: values.title,
          description: values.description || null,
          data: {
            coordinates: DEFAULT_RECORDING_EVENT_COORDINATES,
          },
        },
      });

      toast.success(`Event "${values.title}" edited successfully.`);
    } catch (error) {
      console.error('Failed to edit custom event:', error);

      toast.error('Failed to edit custom event. Please try again.');
    } finally {
      setIsOpen(false);
    }
  };

  const addCustomEvent = async (values: EventFormData) => {
    if (!recordingId || !currentRecordingStartTimestamp) {
      toast.error('Failed to add event. Please try again.');

      setIsOpen(false);

      return;
    }

    try {
      const eventId = uuidv4();

      await triggerAddEvents({
        recordingId,
        events: {
          [eventId]: {
            id: eventId,
            timestamp: currentRecordingStartTimestamp + values.time,
            type: values.type,
            title: values.title,
            description: values.description || null,
            data: {
              coordinates: DEFAULT_RECORDING_EVENT_COORDINATES,
            },
            screenshotUrl: null,
          },
        },
      }).unwrap();

      toast.success(`Event "${values.title}" added successfully.`);
    } catch (error) {
      console.error('Failed to add custom event:', error);

      toast.error('Failed to add custom event. Please try again.');
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <AddEventDialogContext.Provider
      value={{
        isOpen,
        isSubmitting: isLoading,
        setIsOpen,
        addCustomEvent,
        editExistingEvent,
      }}
    >
      {children}
    </AddEventDialogContext.Provider>
  );
};

export interface EventFormData {
  time: number;
  type: RecordingEventType;
  title: string;
  description?: string;
}

export interface AddEventDialogContextValue {
  isOpen: boolean;
  isSubmitting: boolean;
  setIsOpen: (open: boolean) => void;
  addCustomEvent?: (data: EventFormData) => Promise<void>;
  editExistingEvent?: (data: EventFormData) => Promise<void>;
}

export const AddEventDialogContext = createContext<AddEventDialogContextValue>({
  isOpen: false,
  isSubmitting: false,
  setIsOpen: () => {},
});
