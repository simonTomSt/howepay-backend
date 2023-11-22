import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as dotenvConfig } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenvConfig({
  path: !process.env.NODE_ENV ? '.env' : `.env.${process.env.NODE_ENV}`,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: process.env.NODE_ENV === 'prod',
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT);
}
bootstrap();
