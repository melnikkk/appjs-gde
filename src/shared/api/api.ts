import { createApi } from '@reduxjs/toolkit/query/react';
import { TAG_TYPES } from './constants';
import { clerkAuthBaseQuery } from '@/shared/auth/api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: clerkAuthBaseQuery(),
  tagTypes: TAG_TYPES,
  endpoints: () => ({}),
});
