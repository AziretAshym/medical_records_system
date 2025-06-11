import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Patient } from '@/types';
import {
  createPatient,
  deletePatient,
  fetchPatientById,
  fetchPatients,
  updatePatient
} from '@/app/thunks/patientsThunks.ts';


interface PatientsState {
  patients: Patient[];
  count: number;
  loading: boolean;
  error?: string;
  selectedPatient?: Patient | null;
}

const initialState: PatientsState = {
  patients: [],
  count: 0,
  loading: false,
  error: undefined,
  selectedPatient: null,
};



const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    clearSelectedPatient(state) {
      state.selectedPatient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchPatients.fulfilled, (state, action: PayloadAction<{ patients: Patient[]; count: number }>) => {
        state.loading = false;
        state.patients = action.payload.patients;
        state.count = action.payload.count;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchPatientById.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.selectedPatient = null;
      })
      .addCase(fetchPatientById.fulfilled, (state, action: PayloadAction<Patient>) => {
        state.loading = false;
        state.selectedPatient = action.payload;
      })
      .addCase(fetchPatientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createPatient.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(createPatient.fulfilled, (state, action: PayloadAction<Patient>) => {
        state.loading = false;
        state.patients.push(action.payload);
        state.count++;
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updatePatient.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updatePatient.fulfilled, (state, action: PayloadAction<Patient>) => {
        state.loading = false;
        const idx = state.patients.findIndex((p) => p._id === action.payload._id);
        if (idx !== -1) {
          state.patients[idx] = action.payload;
        }
        if (state.selectedPatient && state.selectedPatient._id === action.payload._id) {
          state.selectedPatient = action.payload;
        }
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deletePatient.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(deletePatient.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.patients = state.patients.filter((p) => p._id !== action.payload);
        state.count--;
        if (state.selectedPatient && state.selectedPatient._id === action.payload) {
          state.selectedPatient = null;
        }
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedPatient } = patientsSlice.actions;
export const patientsReducer = patientsSlice.reducer;
