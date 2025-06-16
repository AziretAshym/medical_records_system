export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  avatar?: File;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  displayName: string;
  role: string;
  avatar?: string | File;
  token: string;
}

export interface UserDoctor {
  _id: string;
  name: string;
  specialization?: string;
  avatar?: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  address: string;
  phone: string;
  email?: string;
  bloodType?: string;
  allergies: string[];
  chronicDiseases: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PatientFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  address: string;
  phone: string;
  email: string;
  bloodType: string;
  allergies: string[];
  chronicDiseases: string[];
}

export type CreatePatientPayload = PatientFormData;

export interface UpdatePatientPayload {
  id: string;
  patientData: Partial<PatientFormData>;
}

export interface PatientResponse {
  patient: Patient;
  message?: string;
}


export interface MedicalRecord {
  _id: string;
  patient: string | Patient;
  doctor: string | User;
  visitDate: string;
  symptoms: string[];
  diagnosis: string;
  notes: string;
  recordNumber: string;
  createdBy: string | User;
  updatedBy: string | User;
}

export interface MedicalRecordFormData {
  patient: string;
  doctor: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  date: string;
}
