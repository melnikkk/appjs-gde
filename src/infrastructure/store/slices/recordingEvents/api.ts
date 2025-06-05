import { RecordingEvent, RecordingEvents } from '@/domain/RecordingEvents';
import { apiSlice } from '../../api';
import { Tag } from '../../constants';
import {
  AddRecordingEventsDto,
  DeleteRecordingEventDto,
  EditRecordingEventDto,
  GetRecordingEventsDto,
  GetRecordingEventsResponse,
} from './types';
import { getRecordingEventsTransform } from '@/infrastructure/store/slices/recordingEvents/transforms';

export const recordingEventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<GetRecordingEventsResponse, GetRecordingEventsDto>({
      query: ({ recordingId }) => ({
        url: `recordings/${recordingId}/events`,
      }),
      providesTags: [Tag.RECORDING_EVENTS],
      transformResponse: getRecordingEventsTransform,
    }),
    addEvents: builder.mutation<RecordingEvents, AddRecordingEventsDto>({
      query: ({ recordingId, events }) => ({
        url: `recordings/${recordingId}/events`,
        method: 'POST',
        body: { events },
      }),
      invalidatesTags: [Tag.RECORDING_EVENTS],
    }),
    deleteEvent: builder.mutation<void, DeleteRecordingEventDto>({
      query: ({ recordingId, eventId }) => ({
        url: `recordings/${recordingId}/events/${eventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [Tag.RECORDING_EVENTS],
    }),
    editRecordingEvent: builder.mutation<RecordingEvent, EditRecordingEventDto>({
      query: ({ recordingId, eventId, event }) => ({
        url: `recordings/${recordingId}/events/${eventId}`,
        method: 'PATCH',
        body: event,
      }),
      invalidatesTags: [Tag.RECORDING_EVENTS],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useAddEventsMutation,
  useDeleteEventMutation,
  useEditRecordingEventMutation,
} = recordingEventsApiSlice;
