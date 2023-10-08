import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1/');
  app.enableCors({
    origin: [process.env.FRONT_URL],
    methods: ['GET', 'POST', 'PATCH'],
  });
  await app.listen(10000);
}
bootstrap();
