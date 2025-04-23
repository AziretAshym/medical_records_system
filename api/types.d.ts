export interface UserFields {
  username: string;
  password: string;
  role: string;
  name: string;
  specialization?: string;
  avatar?: string;
  token: string;
}

export interface PatientFields {
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  address: string;
  phone: string;
  email?: string;
  insuranceNumber?: string;
  bloodType?: string;
  allergies?: string[];
  chronicDiseases?: string[];
}

