import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import * as console from "console";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<string>('port');
  const frontUrl = configService.get<string>('frontUrl');

  console.log(`App is running on port: ${port}`);
  console.log(`Allowed cors for: ${frontUrl}`);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1/');
  app.enableCors({
    origin: [frontUrl],
    methods: ['GET', 'POST', 'PATCH'],
  });
  await app.listen(port);
}
bootstrap();
