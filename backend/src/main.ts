import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

  await app.listen(3000, '0.0.0.0');
}
bootstrap();