export interface User{
  name: string;
  email: string;
  password: string;
}

export interface CreateUser extends User{
  id: number;
}

export interface ServerResponse{
  error: string;
  message: string;
}
