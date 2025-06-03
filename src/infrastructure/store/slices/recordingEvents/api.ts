import { RecordingEvent, RecordingEvents } from '@/domain/RecordingEvents';
import { apiSlice } from '../../api';
import { Tag } from '../../constants';
import {
  AddRecordingEventsDto,
  DeleteRecordingEventDto,
  EditRecordingEventDto,
} from './types';

export const recordingEventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addEvents: builder.mutation<RecordingEvents, AddRecordingEventsDto>({
      query: ({ recordingId, events }) => ({
        url: `recordings/${recordingId}/events`,
        method: 'POST',
        body: { events },
      }),
      invalidatesTags: [Tag.RECORDING_EVENTS, Tag.RECORDING],
    }),
    deleteEvent: builder.mutation<void, DeleteRecordingEventDto>({
      query: ({ recordingId, eventId }) => ({
        url: `recordings/${recordingId}/events/${eventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [Tag.RECORDING_EVENTS, Tag.RECORDING],
    }),
    editRecordingEvent: builder.mutation<RecordingEvent, EditRecordingEventDto>({
      query: ({ recordingId, eventId, event }) => ({
        url: `recordings/${recordingId}/events/${eventId}`,
        method: 'PATCH',
        body: event,
      }),
      invalidatesTags: [Tag.RECORDING_EVENTS, Tag.RECORDING],
    }),
  }),
});

export const {
  useAddEventsMutation,
  useDeleteEventMutation,
  useEditRecordingEventMutation,
} = recordingEventsApiSlice;
