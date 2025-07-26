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
    getRecordingThumbnail: builder.query<string, { thumbnailPath: string }>({
      query: ({ thumbnailPath }) => ({
        url: thumbnailPath,
        responseHandler: async (response) => {
          const blob = await response.blob();

          return URL.createObjectURL(blob);
        },
      }),
      onCacheEntryAdded: async (_arg, { cacheEntryRemoved }) => {
        await cacheEntryRemoved;

        try {
          const objectUrl = await cacheEntryRemoved.then(() => {});

          if (
            typeof objectUrl === 'string' &&
            (objectUrl as string).startsWith('blob:')
          ) {
            URL.revokeObjectURL(objectUrl);
          }
        } catch (error) {
          console.error('Error revoking object URL:', error);
        }
      },
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
    getRecordingVideo: builder.query<string, { videoPath: string }>({
      query: ({ videoPath }) => ({
        url: videoPath,
        responseHandler: async (response) => {
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        },
      }),
      onCacheEntryAdded: async (_arg, { cacheEntryRemoved }) => {
        await cacheEntryRemoved;

        try {
          const objectUrl = (await cacheEntryRemoved.then(() => {})) as string;

          if (typeof objectUrl === 'string' && objectUrl.startsWith('blob:')) {
            URL.revokeObjectURL(objectUrl);
          }
        } catch (error) {
          console.error('Error revoking object URL:', error);
        }
      },
    }),
  }),
});

export const {
  useGetRecordingsQuery,
  useGetRecordingQuery,
  useDeleteRecordingMutation,
  useUpdateRecordingMutation,
  useExportAsStepByStepHTMLQuery,
  useGetRecordingThumbnailQuery,
  useGetRecordingVideoQuery,
} = recordingsApiSlice;
