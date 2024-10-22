import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.listen(3000, () => console.log('Application is listening on port 3000.'));
}

bootstrap();
