import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Users } from '@prisma/client';
import { ID, NewUser, Response, PartialUser } from 'src/types/users.types';

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}

  async getUsers(): Promise<Users[] | string> {
    try {
      const users = await this.db.users.findMany();

      if (users.length === 0) return 'No users yet.';

      return users;
    } catch (error) {
      return error;
    }
  }

  async getUser(id: ID): Promise<Users | string> {
    try {
      const user = await this.db.users.findUnique({ where: { id: id } });

      if (!user) return 'No user found.';

      return user;
    } catch (error) {
      return error;
    }
  }

  async createUser(newUser: NewUser): Promise<Response | string> {
    try {
      const userExists = await this.db.users.findFirst({
        where: { email: newUser.email },
      });

      if (userExists) return 'User already exists.';

      const createUser = await this.db.users.create({ data: newUser });

      return { result: 'User created ', user: createUser };
    } catch (error) {
      return error;
    }
  }
  async updateUser(
    updatedUser: PartialUser,
    id: ID,
  ): Promise<Response | string> {
    try {
      const updateUser = await this.db.users.update({
        where: { id },
        data: updatedUser,
      });

      return { result: 'User updated ', user: updateUser };
    } catch (error) {
      if (error.meta.cause) return error.meta.cause;

      return error;
    }
  }
  async deleteUser(id: ID): Promise<Response | string> {
    try {
      const user = await this.db.users.delete({ where: { id } });

      return { result: 'User deleted', user: user };
    } catch (error) {
      if (error.meta.cause) return error.meta.cause;

      return error;
    }
  }
}
