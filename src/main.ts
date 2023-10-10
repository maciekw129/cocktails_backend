import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1/');
  app.enableCors({
    origin: [configService.get<string>('frontUrl')],
    methods: ['GET', 'POST', 'PATCH'],
  });
  await app.listen(configService.get<string>('port'));
}
bootstrap();
