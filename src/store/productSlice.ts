import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Redux slice for managing product data
// Handles async data fetching with loading/error states
// Stores full product details including sales history
// Using TypeScript interfaces for type safety

interface Sale {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

interface Product {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: {
    customer: string;
    review: string;
    score: number;
  }[];
  retailer: string;
  details: string[];
  tags: string[];
  sales: Sale[];
}

interface ProductState {
  data: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  data: null,
  status: 'idle',
  error: null
};

export const fetchData = createAsyncThunk('product/fetchData', async () => {
  const response = await fetch('/stackline/stackline_frontend_assessment_data_2021.json');
  const data = await response.json();
  return data[0];
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default productSlice.reducer;
