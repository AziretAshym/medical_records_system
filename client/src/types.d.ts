
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
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
