import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  RegisterResponse,
  User,
  UserDoctor,
  ValidationError
} from '@/types';
import axiosApi from '../../axiosApi.ts';
import { isAxiosError } from 'axios';
import { RootState } from '../store.ts';

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>(
  'users/register',
  async (registerMutation: RegisterMutation, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("username", registerMutation.username);
      formData.append("password", registerMutation.password);
      formData.append("name", registerMutation.name);
      formData.append("role", registerMutation.role);
      if (registerMutation.specialization) {
        formData.append("specialization", registerMutation.specialization);
      }
      if (registerMutation.avatar) {
        formData.append("avatar", registerMutation.avatar);
      }

      const response = await axiosApi.post<RegisterResponse>('users/register', formData);

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);


export const login = createAsyncThunk<
  User,
  LoginMutation,
  {rejectValue: GlobalError}
>(
  'users/login',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('users/session', loginMutation);
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  }
);

export const logout = createAsyncThunk<void, void, {state: RootState}>(
  'users/logout',
  async (_, {getState}) => {
    const token = getState().users.user?.token;
    await axiosApi.delete(`users/session`, {headers: {'Authorization': token}});
  }
);

export const fetchDoctors = createAsyncThunk<UserDoctor[]>(
  'doctors/fetchDoctors',
  async () => {
    const response = await axiosApi.get('/users/doctors');
    return response.data;
  }
);

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const response = await axiosApi.get('/users');
    return response.data;
  }
)
