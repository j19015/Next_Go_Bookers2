export interface User{
  name: string;
  email: string;
  password: string;
}

export interface ResponseUser extends User{
  id: number;
}

export interface ServerResponse{
  error: string;
  message: string;
}
