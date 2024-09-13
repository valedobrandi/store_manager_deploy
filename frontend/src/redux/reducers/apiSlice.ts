import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    fetchData: builder.query<void, string>({
      query: (query) => (
        query
      ),
    }),
    salesData: builder.query<void, void>({
      query: () => '/sales',
    }),
    productsData: builder.query<void, void>({
      query: () => '/products',
    }),
    sendData: builder.mutation({
      query: (query) => (query),
    }),
  }),
});

export const {
  useLazyFetchDataQuery,
  useSalesDataQuery,
  useProductsDataQuery,
  useSendDataMutation,
} = apiSlice;
