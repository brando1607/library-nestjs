import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dbConnection } from './utils/dbConnection';

async function bootstrap() {
  //db setup
  dbConnection();

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Server listening on port http://localhost:${process.env.PORT || 3000}`,
  );
}
bootstrap();
