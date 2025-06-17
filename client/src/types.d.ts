export interface RegisterMutation {
  username: string;
  password: string;
  name: string;
  role: string;
  specialization?: string;
  avatar?: File;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  name: string;
  role: string;
  specialization?: string;
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
  doctor: string | UserDoctor;
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
  visitDate: string;
  symptoms: string;
  diagnosis: string;
  notes: string;
}

  export interface Treatment {
    _id: string;
    name: string;
    description: string;
    type: 'медикамент' | 'процедура' | 'операция' | 'рекомендация';
    dosage?: string;
    frequency?: string;
    duration?: string;
    startDate: string;
    endDate?: string;
    status: 'запланировано' | 'в процессе' | 'выполнено' | 'отменено';
    treatmentNumber: string;
    createdAt: string;
    updatedAt: string;
    medicalRecord: string | MedicalRecord;
    patient: string | Pick<Patient, '_id' | 'firstName' | 'lastName'>;
    assignedBy: string | Pick<User, '_id' | 'name'>;
    updatedBy: string | Pick<User, '_id' | 'name'>;
  }

export interface TreatmentFormData {
  name: string;
  description: string;
  type: 'медикамент' | 'процедура' | 'операция' | 'рекомендация';
  dosage: string;
  frequency: string;
  duration: string;
  startDate: string;
  endDate: string;
  status: 'запланировано' | 'в процессе' | 'выполнено' | 'отменено';
  patient: string;
  assignedBy: string;
  updatedBy: string;
  medicalRecord: string;
}