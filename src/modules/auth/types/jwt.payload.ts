import { Role } from '@prisma/client';

export type JwtPayload = {
  id: number;
  role: Role;
};
