import { createSlice } from "@reduxjs/toolkit";
import { MedicalRecord } from "@/types";
import {
  fetchMedicalRecords,
  fetchMedicalRecordById,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
} from "../thunks/medicalRecordsThunks";
import { RootState } from '@/app/store.ts';

interface MedicalRecordsState {
  records: MedicalRecord[];
  count: number,
  selectedRecord: MedicalRecord | null;
  loading: boolean;
  error: string | null;
}

const initialState: MedicalRecordsState = {
  records: [],
  count: 0,
  selectedRecord: null,
  loading: false,
  error: null,
};

export const selectMedicalRecords = (state: RootState) => state.medicalRecords.records;
export const selectSelectedMedicalRecord = (state: RootState) => state.medicalRecords.selectedRecord;
export const selectMedicalRecordsLoading = (state: RootState) => state.medicalRecords.loading;
export const selectMedicalRecordsError = (state: RootState) => state.medicalRecords.error;

const medicalRecordsSlice = createSlice({
  name: "medicalRecords",
  initialState,
  reducers: {
    clearSelectedRecord(state) {
      state.selectedRecord = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMedicalRecords.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicalRecords.fulfilled, (state, action) => {
        state.records = action.payload.records;
        state.count = action.payload.count;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMedicalRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки записей";
      })

      .addCase(fetchMedicalRecordById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicalRecordById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRecord = action.payload;
      })
      .addCase(fetchMedicalRecordById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки записи";
      })

      .addCase(createMedicalRecord.fulfilled, (state, action) => {
        state.records.push(action.payload);
      })

      .addCase(updateMedicalRecord.fulfilled, (state, action) => {
        const index = state.records.findIndex(r => r._id === action.payload._id);
        if (index !== -1) {
          state.records[index] = action.payload;
        }
      })

      .addCase(deleteMedicalRecord.fulfilled, (state, action) => {
        state.records = state.records.filter(r => r._id !== action.payload);
      });
  },
});

export const { clearSelectedRecord } = medicalRecordsSlice.actions;
export const medicalRecordsReducer = medicalRecordsSlice.reducer;
