import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';

// Redux store configuration
// Currently only using product reducer

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 