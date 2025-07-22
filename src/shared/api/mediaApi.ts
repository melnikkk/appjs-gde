import { apiSlice } from '@/shared/api';

export const sharedMediaApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthenticatedMedia: builder.query<string, { mediaPath: string }>({
      query: ({ mediaPath }) => ({
        url: mediaPath,
        responseHandler: async (response) => {
          const blob = await response.blob();

          return URL.createObjectURL(blob);
        },
      }),
      onCacheEntryAdded: async (arg, { cacheEntryRemoved }) => {
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
  }),
});

export const { useGetAuthenticatedMediaQuery } = sharedMediaApiSlice;
