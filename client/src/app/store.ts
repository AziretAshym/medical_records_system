import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/usersSlice.ts';
import storage from 'redux-persist/lib/storage';
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import { patientsReducer } from '@/app/slices/patientsSlice.ts';
import { medicalRecordsReducer } from '@/app/slices/medicalRecordsSlice.ts';
import { treatmentsReducer } from '@/app/slices/treatmentsSlice.ts';


const usersPersistConfig = {
  key: 'store:users',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  patients: patientsReducer,
  medicalRecords: medicalRecordsReducer,
  treatments: treatmentsReducer,
})


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
