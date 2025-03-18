import {
  Controller,
  Delete,
  Post,
  Get,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './users.service';
import { ID, NewUser, PartialUser } from 'src/types/users.types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    try {
      const result = await this.userService.getUsers();

      return result;
    } catch (error) {
      console.error(error);
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: ID) {
    try {
      const result = await this.userService.getUser(id);

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  async createUser(@Body() newUser: NewUser) {
    try {
      const result = await this.userService.createUser(newUser);

      return result;
    } catch (error) {
      console.error(error);
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: ID, @Body() updatedUser: PartialUser) {
    try {
      const result = await this.userService.updateUser(updatedUser, id);

      return result;
    } catch (error) {
      console.error(error);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: ID) {
    try {
      const result = await this.userService.deleteUser(id);

      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
