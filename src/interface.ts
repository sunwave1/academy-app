import { Request } from 'express';

export interface JwtPayload {
  id: number;
  name: string;
  email: string;
  morph_id: number | null;
  morph_model: string | null;
  age: number | null;
  avatar_asset: string | null;
  password: string;
  cpf_cnpj: string | null;
  phone: string | null;
  second_phone: string | null;
  receive_marketing: boolean;
  deleted_at: string | null;
  birth_date_at: string | null;
  created_at: string;
  updated_at: string;
  iat: number;
  exp: number;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}
