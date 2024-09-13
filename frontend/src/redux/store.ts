import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './reducers/apiSlice';
import storeManagerReducer from './reducers/storeManager';

export const store = configureStore({
  reducer: {
    storeManager: storeManagerReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(apiSlice.middleware),
});
