import { createAsyncThunk } from '@reduxjs/toolkit';
import { Treatment } from '@/types';
import axiosApi from '@/axiosApi.ts';

export const fetchAllTreatments = createAsyncThunk<Treatment[]>(
  'treatments/fetchAll',
  async () => {
    const response = await axiosApi.get('/treatments');
    return response.data;
  }
);

export const fetchTreatmentById = createAsyncThunk<Treatment, string>(
  'treatments/fetchById',
  async (id) => {
    const response = await axiosApi.get(`/treatments/${id}`);
    return response.data;
  }
);

export const createTreatment = createAsyncThunk<Treatment, Partial<Treatment>>(
  'treatments/create',
  async (treatmentData) => {
    const response = await axiosApi.post('/treatments', treatmentData);
    return response.data;
  }
);

export const updateTreatment = createAsyncThunk<Treatment, { id: string; data: Partial<Treatment> }>(
  'treatments/update',
  async ({ id, data }) => {
    const response = await axiosApi.put(`/treatments/${id}`, data);
    return response.data;
  }
);

export const deleteTreatment = createAsyncThunk<string, string>(
  'treatments/delete',
  async (id) => {
    await axiosApi.delete(`/treatments/${id}`);
    return id;
  }
);
