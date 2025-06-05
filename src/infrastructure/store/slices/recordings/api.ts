import { Recording, Recordings } from '@/domain/Recordings';
import { apiSlice } from '../../api';
import { Tag } from '../../constants';
import { RequestRecordingDto } from './types';

export const recordingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecordings: builder.query<Recordings, void>({
      query: () => ({
        url: `/recordings`,
      }),
      providesTags: [Tag.RECORDINGS],
    }),
    getRecording: builder.query<Recording, RequestRecordingDto>({
      query: ({ id }) => ({
        url: `/recordings/${id}`,
      }),
      providesTags: [Tag.RECORDING],
    }),
    deleteRecording: builder.mutation<void, RequestRecordingDto>({
      query: ({ id }) => ({
        url: `/recordings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [Tag.RECORDINGS],
    }),
  }),
});

export const { useGetRecordingsQuery, useGetRecordingQuery, useDeleteRecordingMutation } =
  recordingsApiSlice;
