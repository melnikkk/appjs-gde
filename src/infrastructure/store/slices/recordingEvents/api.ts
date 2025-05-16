import { apiSlice } from '../../api';
import { Tag } from '../../constants';
import { AddRecordingEventsDto, DeleteRecordingEventDto } from './types';

export const recordingEventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addEvents: builder.mutation<void, AddRecordingEventsDto>({
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
  }),
});

export const { useAddEventsMutation, useDeleteEventMutation } = recordingEventsApiSlice;
