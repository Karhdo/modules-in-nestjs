import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { Logger } from './core/logger/logger.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.useLogger(app.get(Logger));

  await app.listen(3000);
}
bootstrap();
