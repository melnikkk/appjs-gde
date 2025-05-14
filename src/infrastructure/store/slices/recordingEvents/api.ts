import { apiSlice } from '../../api';
import { Tag } from '../../constants';
import { AddRecordingEventsDto } from './types';

export const recordingEventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addEvents: builder.mutation<void, AddRecordingEventsDto>({
      query: ({ recordingId, events }) => ({
        url: `recordings/${recordingId}/events`,
        method: 'POST',
        body: { events },
      }),
      invalidatesTags: [Tag.RECORDING_EVENTS],
    }),
  }),
});

export const { useAddEventsMutation } = recordingEventsApiSlice;
