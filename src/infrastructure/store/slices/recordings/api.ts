import { Recording, Recordings } from '@/domain/Recordings';
import { apiSlice } from '../../api';
import { Tag } from '../../constants';
import { ExportAsStepByStepHTMLRequestDto, RequestRecordingDto } from './types';

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
    exportAsStepByStepHTML: builder.query<string, ExportAsStepByStepHTMLRequestDto>({
      query: ({ recordingId }) => ({
        url: `/recordings/${recordingId}/embed-code`,
        method: 'GET',
        responseHandler: async (response) => {
          return await response.text();
        },
      }),
    }),
  }),
});

export const {
  useGetRecordingsQuery,
  useGetRecordingQuery,
  useDeleteRecordingMutation,
  useExportAsStepByStepHTMLQuery,
} = recordingsApiSlice;
