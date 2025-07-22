import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const clerkAuthBaseQuery = (): BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      try {
        if (window.Clerk?.session) {
          try {
            const token = await window.Clerk.session.getToken();

            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
          } catch (tokenError) {
            // TODO: provide better handling solution
            console.error('Error getting token from Clerk session:', tokenError);
          }
        }
      } catch (error) {
        console.error('Error in auth base query:', error);
      }

      return headers;
    },
  });

  return baseQuery;
};
