import { apiSlice } from '../../store/api';
import { Tag } from '../../store/constants';

export const recordingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecordings: builder.query({
      query: () => ({
        url: `/recordings`,
      }),
      providesTags: [Tag.RECORDINGS],
    }),
    getRecording: builder.query({
      query: ({ id }) => ({
        url: `/recordings/${id}`,
      }),
    }),
  }),
});

export const {
  useGetRecordingsQuery,
  useGetRecordingQuery,
} = recordingsApiSlice;
