import { Request } from "express";

export interface AuthRequest extends Request {
  user?: Users;
}
export interface Users {
    id?: number
    rol: string;
    name: string;
    email: string;
    password: string;
    avatar?: string;
    created_at : string
  }