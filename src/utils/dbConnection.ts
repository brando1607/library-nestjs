import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();

export const dbConnection = async () => {
  try {
    await db.users.findMany();
    console.log('DB connected.');
  } catch (error) {
    console.log('Error when connecting to db.');

    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(error);
    }
  }
};
