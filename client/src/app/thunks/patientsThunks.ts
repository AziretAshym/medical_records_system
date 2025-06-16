import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi.ts';
import { GlobalError, Patient } from '@/types';
import { isAxiosError } from 'axios';

export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async (
    params: { page?: number; limit?: number; firstName?: string; lastName?: string } | undefined,
    { rejectWithValue }
  ) => {
    try {
      const query = new URLSearchParams();
      if (params?.page) query.append('page', params.page.toString());
      if (params?.limit) query.append('limit', params.limit.toString());
      if (params?.firstName) query.append('firstName', params.firstName);
      if (params?.lastName) query.append('lastName', params.lastName);

      const { data } = await axiosApi.get(`/patients?${query}`);
      return data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  }
);

export const fetchPatientById = createAsyncThunk(
  'patients/fetchPatientById',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/patients/${id}`);
      return data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  }
);

export const createPatient = createAsyncThunk(
  'patients/createPatient',
  async (patientData: Omit<Patient, '_id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.post('/patients', patientData);
      return data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  }
);

export const updatePatient = createAsyncThunk(
  'patients/updatePatient',
  async (
    { id, patientData }: { id: string; patientData: Partial<Omit<Patient, '_id' | 'createdAt' | 'updatedAt'>> },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosApi.patch(`/patients/${id}`, patientData);
      return data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  }
);

export const deletePatient = createAsyncThunk(
  'patients/deletePatient',
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosApi.delete(`/patients/${id}`);
      return id;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  }
);
