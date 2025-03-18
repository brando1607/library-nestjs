import { Users } from '@prisma/client';

export type ID = Users['id'];

export type NewUser = Omit<Users, 'id'>;

export type PartialUser = Partial<Users>;

export type Response = {
  result: string;
  user: Users;
};
