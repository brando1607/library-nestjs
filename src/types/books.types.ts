import { Books } from '@prisma/client';

export type NewBook = Omit<Books, 'id'>;

export type PartialBook = Partial<Books>;

export type Response = {
  result: string;
  book: Books;
};

export type ManageBooks = {
  bookId: string;
  action: string;
};
