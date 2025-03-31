import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Tag } from './constants';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  tagTypes: [Tag.RECORDINGS],
  endpoints: () => ({}),
});
