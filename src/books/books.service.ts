import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Books } from '@prisma/client';
import { ID } from 'src/types/users.types';
import {
  NewBook,
  Response,
  PartialBook,
  ManageBooks,
} from 'src/types/books.types';

@Injectable()
export class BookService {
  constructor(private db: PrismaService) {}

  async getAllBooks(): Promise<Books[] | string> {
    try {
      const books = await this.db.books.findMany();

      if (books.length === 0) return 'No books yet.';

      return books;
    } catch (error) {
      return error;
    }
  }
  async getBook(id: ID): Promise<Books | string> {
    try {
      const book = await this.db.books.findFirst({ where: { id: id } });

      if (!book) return 'Book not found';

      return book;
    } catch (error) {
      return error;
    }
  }
  async createBook(newBook: NewBook, userId: ID): Promise<Response | string> {
    try {
      const userIsAuthor = await this.db.users.findFirst({
        where: { id: userId },
      });

      if (!userIsAuthor) return 'User not found';

      if (userIsAuthor.role !== 'AUTHOR') return 'User is not an author';

      const bookExists = await this.db.books.findUnique({
        where: { name: newBook.name },
      });

      if (bookExists) return 'Book already exists.';

      const bookData = {
        name: newBook.name,
        released: newBook.released,
        pages: newBook.pages,
        stock: newBook.stock,
        authorId: userId,
      };

      const createBook = await this.db.books.create({ data: bookData });

      return { result: 'Book created', book: createBook };
    } catch (error) {
      return error;
    }
  }
  async updateBook(id: ID, newData: PartialBook): Promise<Response> {
    try {
      const updateBook = await this.db.books.update({
        where: { id: id },
        data: newData,
      });

      return { result: 'Book updated ', book: updateBook };
    } catch (error) {
      if (error.meta.cause) return error.meta.cause;

      return error;
    }
  }
  async deleteBook(id: ID): Promise<Response> {
    try {
      const deleteBook = await this.db.books.delete({ where: { id: id } });

      return { result: 'Book deleted ', book: deleteBook };
    } catch (error) {
      if (error.meta.cause) return error.meta.cause;

      return error;
    }
  }
  async takeBook(userId: ID, bookId: ID): Promise<string> {
    try {
      const user = await this.db.users.findFirst({ where: { id: userId } });
      const book = await this.db.books.findFirst({ where: { id: bookId } });

      if (!user || !book) return 'Book or user not found';

      //update stock

      await this.db.books.update({
        where: { id: bookId },
        data: { stock: book.stock - 1 },
      });

      //add book to user

      await this.db.users.update({
        where: { id: userId },
        data: { currentbooks: [...user.currentbooks, book.name] },
      });

      return `Book ${book.name} taken by ${user.name}`;
    } catch (error) {
      return error;
    }
  }
  async returnBook(userId: ID, bookId: ID): Promise<string> {
    try {
      const user = await this.db.users.findFirst({ where: { id: userId } });
      const book = await this.db.books.findFirst({ where: { id: bookId } });

      if (!user || !book) return 'Book or user not found';

      const userHasBook = user.currentbooks.includes(book.name);

      if (!userHasBook) return "User doesn't have book";

      const bookIndex = user.currentbooks.findIndex((e) => e === book.name);

      //remove from current books

      const newCurrent = user.currentbooks.splice(bookIndex, 0);

      await this.db.users.update({
        where: { id: userId },
        data: { currentbooks: [...newCurrent] },
      });

      //update stock

      await this.db.books.update({
        where: { id: bookId },
        data: { stock: book.stock + 1 },
      });

      return `Book ${book.name} returned by ${user.name}`;
    } catch (error) {
      return error;
    }
  }
  async manageBooks(userId: ID, manageBooks: ManageBooks): Promise<string> {
    try {
      const { bookId, action } = manageBooks;

      if (action === 'take') return await this.takeBook(userId, bookId);

      if (action === 'return') return await this.returnBook(userId, bookId);

      return 'Invalid action';
    } catch (error) {
      return error;
    }
  }
}
