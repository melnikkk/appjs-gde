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
import { RootState } from '@/infrastructure/store';

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
      onQueryStarted: async (
        { recordingId, eventId, event },
        { dispatch, queryFulfilled, getState },
      ) => {
        const state = getState() as RootState;
        const getResult = recordingEventsApiSlice.endpoints.getEvents.select({
          recordingId,
        })(state);

        if (!getResult.data) {
          return;
        }

        const patchResult = dispatch(
          recordingEventsApiSlice.util.updateQueryData(
            'getEvents',
            { recordingId },
            (draft) => {
              if (draft.entities && draft.entities[eventId]) {
                draft.entities[eventId] = {
                  ...draft.entities[eventId],
                  ...event,
                };
              }
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();

          console.error('Failed to update event coordinates: ', err);
        }
      },
      invalidatesTags: [Tag.RECORDING_EVENTS],
    }),
    generateAiRecordingEventsContent: builder.mutation<string, { recordingId: string }>({
      query: ({ recordingId }) => ({
        url: `recordings/${recordingId}/events/generate-ai-content`,
        method: 'POST',
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
  useGenerateAiRecordingEventsContentMutation,
} = recordingEventsApiSlice;
