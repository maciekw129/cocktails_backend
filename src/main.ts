import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1/');
  app.enableCors({
    origin: ['http://localhost:65040'],
    methods: ['GET', 'POST'],
  });
  await app.listen(3000);
}
bootstrap();
