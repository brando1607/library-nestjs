import {
  Controller,
  Delete,
  Post,
  Get,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { BookService } from './books.service';
import { ID } from 'src/types/users.types';
import { NewBook, PartialBook, ManageBooks } from 'src/types/books.types';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBooks() {
    try {
      const result = await this.bookService.getAllBooks();

      return result;
    } catch (error) {
      console.error(error);
    }
  }

  @Get(':id')
  async getBook(@Param('id') id: ID) {
    try {
      const result = await this.bookService.getBook(id);

      return result;
    } catch (error) {
      console.error(error);
    }
  }

  @Post(':id')
  async createBook(@Param('id') id: ID, @Body() newBook: NewBook) {
    try {
      const result = await this.bookService.createBook(newBook, id);

      return result;
    } catch (error) {
      console.error(error);
    }
  }
  @Put(':id')
  async updateBook(@Param('id') id: ID, @Body() newData: PartialBook) {
    try {
      const result = await this.bookService.updateBook(id, newData);

      return result;
    } catch (error) {
      console.error(error);
    }
  }
  @Delete(':id')
  async deleteBook(@Param('id') id: ID) {
    try {
      const result = await this.bookService.deleteBook(id);

      return result;
    } catch (error) {
      console.error(error);
    }
  }

  @Put(':userId')
  async manageBooks(
    @Param('userId') userId: ID,
    @Body() manageBooks: ManageBooks,
  ) {
    try {
      const result = await this.bookService.manageBooks(userId, manageBooks);

      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
