import React, { createContext, ReactNode, useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { v4 as uuidv4 } from 'uuid';
import {
  useAddEventsMutation,
  useEditRecordingEventMutation,
} from '@/infrastructure/store/slices/recordingEvents/api';
import {
  DEFAULT_RECORDING_EVENT_COORDINATES,
  RecordingEventType,
} from '@/domain/RecordingEvents/constants';
import { toast } from 'sonner';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { selectCurrentEvent } from '@/infrastructure/store/slices/recordingEvents/selectors';
import { selectCurrentRecordingStartTimestamp } from '@/infrastructure/store/slices/recordings/selectors';

export interface EventFormData {
  time: number;
  type: RecordingEventType;
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
          data: {
            coordinates: DEFAULT_RECORDING_EVENT_COORDINATES,
          },
        },
      });
    } catch (e) {
      toast.error('Failed to edit custom event. Please try again.');
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
            data: {
              coordinates: DEFAULT_RECORDING_EVENT_COORDINATES,
            },
            screenshotUrl: null,
          },
        },
      }).unwrap();

      toast.success(`Custom event "${values.type}" added successfully.`);
    } catch (error) {
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
