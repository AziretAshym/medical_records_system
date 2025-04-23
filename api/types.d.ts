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
  dateOfBirth: Date;
  gender: 'male' | 'female';
  address: string;
  phone: string;
  email?: string;
  bloodType?: string;
  allergies?: string[];
  chronicDiseases?: string[];
}

