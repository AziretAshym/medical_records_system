import { GlobalError, User, UserDoctor, ValidationError } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';
import { fetchDoctors, login, register } from '../thunks/usersThunks.ts';

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  all: UserDoctor[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  all: [],
  loading: false,
  error: null,
};

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectAllDoctors = (state: RootState) => state.users.all;
export const selectDoctorsLoading = (state: RootState) => state.users.loading;
export const selectDoctorsError = (state: RootState) => state.users.error;



export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state, {payload: registerResponse}) => {
        state.user = registerResponse.user;
        state.registerLoading = false
      })
      .addCase(register.rejected, (state, {payload: error}) => {
        state.registerLoading = false;
        state.registerError = error || null;
      })

      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, {payload: user}) => {
        state.user = user;
        state.loginLoading = false
      })
      .addCase(login.rejected, (state, {payload: error}) => {
        state.loginLoading = false;
        state.loginError = error || null;
      })
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки врачей';
      });
  }
});

export const {unsetUser} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
