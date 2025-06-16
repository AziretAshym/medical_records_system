import { createAsyncThunk } from "@reduxjs/toolkit";
import { MedicalRecord } from "@/types";
import axiosApi from '@/axiosApi.ts';

export const fetchMedicalRecords = createAsyncThunk<{
  records: MedicalRecord[];
  count: number;
}, { page: number; limit: number }>(
  'medicalRecords/fetchAll',
  async ({ page, limit }) => {
    const response = await axiosApi.get('/medical-records', { params: { page, limit } });
    return { records: response.data.records, count: response.data.total };
  }
);

export const fetchMedicalRecordById = createAsyncThunk<MedicalRecord, string>(
  "medicalRecords/fetchOne",
  async (id) => {
    const response = await axiosApi.get(`/medical-records/${id}`);
    return response.data;
  }
);

export const fetchRecordsByPatient = createAsyncThunk<MedicalRecord[], string>(
  "medicalRecords/fetchByPatient",
  async (patientId) => {
    const response = await axiosApi.get(`/medical-records/patient/${patientId}`);
    return response.data;
  }
);

export const createMedicalRecord = createAsyncThunk<MedicalRecord, Partial<MedicalRecord>>(
  "medicalRecords/create",
  async (data) => {
    const response = await axiosApi.post("/medical-records", data);
    return response.data;
  }
);

export const updateMedicalRecord = createAsyncThunk<MedicalRecord, { id: string; data: Partial<MedicalRecord> }>(
  "medicalRecords/update",
  async ({ id, data }) => {
    const response = await axiosApi.put(`/medical-records/${id}`, data);
    return response.data;
  }
);

export const deleteMedicalRecord = createAsyncThunk<string, string>(
  "medicalRecords/delete",
  async (id) => {
    await axiosApi.delete(`/medical-records/${id}`);
    return id;
  }
);
