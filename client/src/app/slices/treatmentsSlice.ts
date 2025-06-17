import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllTreatments,
  fetchTreatmentById,
  createTreatment,
  updateTreatment,
  deleteTreatment,
} from '@/app/thunks/treatmentsThunks';
import { Treatment } from '@/types';
import { RootState } from '@/app/store.ts';

interface TreatmentsState {
  items: Treatment[];
  selected: Treatment | null;
  loading: boolean;
  error: string | null;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
}

const initialState: TreatmentsState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
  creating: false,
  updating: false,
  deleting: false,
};

export const selectAllTreatments = (state: RootState) => state.treatments.items;
export const selectSelectedTreatment = (state: RootState) => state.treatments.selected;
export const selectTreatmentsLoading = (state: RootState) => state.treatments.loading;
export const selectTreatmentsError = (state: RootState) => state.treatments.error;
export const selectCreatingTreatment = (state: RootState) => state.treatments.creating;
export const selectUpdatingTreatment = (state: RootState) => state.treatments.updating;
export const selectDeletingTreatment = (state: RootState) => state.treatments.deleting;

const treatmentsSlice = createSlice({
  name: 'treatments',
  initialState,
  reducers: {
    clearSelectedTreatment(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTreatments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTreatments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllTreatments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке назначений';
      })
      .addCase(fetchTreatmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTreatmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchTreatmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке назначения';
      })
      .addCase(createTreatment.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createTreatment.fulfilled, (state, action) => {
        state.creating = false;
        state.items.unshift(action.payload);
      })
      .addCase(createTreatment.rejected, (state, action) => {
        state.creating = false;
        state.error = action.error.message || 'Ошибка при создании назначения';
      })
      .addCase(updateTreatment.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateTreatment.fulfilled, (state, action) => {
        state.updating = false;
        const index = state.items.findIndex(t => t._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selected && state.selected._id === action.payload._id) {
          state.selected = action.payload;
        }
      })
      .addCase(updateTreatment.rejected, (state, action) => {
        state.updating = false;
        state.error = action.error.message || 'Ошибка при обновлении назначения';
      })
      .addCase(deleteTreatment.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteTreatment.fulfilled, (state, action) => {
        state.deleting = false;
        state.items = state.items.filter(t => t._id !== action.payload);
        if (state.selected?._id === action.payload) {
          state.selected = null;
        }
      })
      .addCase(deleteTreatment.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.error.message || 'Ошибка при удалении назначения';
      });
  },
});

export const { clearSelectedTreatment } = treatmentsSlice.actions;
export const treatmentsReducer = treatmentsSlice.reducer;
