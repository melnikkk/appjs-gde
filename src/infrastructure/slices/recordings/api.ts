import { Recording, Recordings } from '../../../domain/Recordings';
import { apiSlice } from '../../store/api';
import { Tag } from '../../store/constants';
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
  }),
});

export const { useGetRecordingsQuery, useGetRecordingQuery } = recordingsApiSlice;
