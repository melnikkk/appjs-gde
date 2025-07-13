import { apiSlice, Tag } from '@/shared/api';
import {
  ExportAsStepByStepHTMLRequestDto,
  RequestRecordingDto,
  Recording,
  Recordings,
  UpdateRecordingDto,
} from '../model/types';

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
    updateRecording: builder.mutation<Recording, UpdateRecordingDto>({
      query: ({ id, name }) => ({
        url: `/recordings/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: [Tag.RECORDING, Tag.RECORDINGS],
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
  useUpdateRecordingMutation,
  useExportAsStepByStepHTMLQuery,
} = recordingsApiSlice;
