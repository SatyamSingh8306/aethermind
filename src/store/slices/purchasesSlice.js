import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMyPurchases, fetchPurchases, fetchPurchasesSummary } from '../../services/api';

export const loadMyPurchases = createAsyncThunk('purchases/loadMy', async () => {
  return await fetchMyPurchases();
});

export const loadAdminPurchases = createAsyncThunk('purchases/loadAdmin', async (filters = {}) => {
  return await fetchPurchases(filters);
});

export const loadSummary = createAsyncThunk('purchases/loadSummary', async () => {
  return await fetchPurchasesSummary();
});

const purchasesSlice = createSlice({
  name: 'purchases',
  initialState: {
    my: { items: [], status: 'idle', error: null },
    admin: { items: [], status: 'idle', error: null, filters: {} },
    summary: { data: null, status: 'idle', error: null },
  },
  reducers: {
    setAdminFilters(state, action) {
      state.admin.filters = action.payload || {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMyPurchases.pending, (state) => {
        state.my.status = 'loading';
        state.my.error = null;
      })
      .addCase(loadMyPurchases.fulfilled, (state, action) => {
        state.my.status = 'succeeded';
        state.my.items = Array.isArray(action.payload) ? action.payload : (action.payload?.purchases || []);
      })
      .addCase(loadMyPurchases.rejected, (state, action) => {
        state.my.status = 'failed';
        state.my.error = action.error?.message || 'Failed to load purchases';
      })
      .addCase(loadAdminPurchases.pending, (state) => {
        state.admin.status = 'loading';
        state.admin.error = null;
      })
      .addCase(loadAdminPurchases.fulfilled, (state, action) => {
        state.admin.status = 'succeeded';
        state.admin.items = Array.isArray(action.payload) ? action.payload : (action.payload?.purchases || []);
      })
      .addCase(loadAdminPurchases.rejected, (state, action) => {
        state.admin.status = 'failed';
        state.admin.error = action.error?.message || 'Failed to load purchases';
      })
      .addCase(loadSummary.pending, (state) => {
        state.summary.status = 'loading';
        state.summary.error = null;
      })
      .addCase(loadSummary.fulfilled, (state, action) => {
        state.summary.status = 'succeeded';
        state.summary.data = action.payload || null;
      })
      .addCase(loadSummary.rejected, (state, action) => {
        state.summary.status = 'failed';
        state.summary.error = action.error?.message || 'Failed to load summary';
      });
  },
});

export const { setAdminFilters } = purchasesSlice.actions;
export default purchasesSlice.reducer;


