import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import * as express from 'express';
import { MONGODB_URI, PORT } from './env/envoriment';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const logger = new Logger('NestApplication');

  app.disable('x-powered-by');
  app.enableCors({
    origin: '*',
  });
  app.use(express.json({ limit: '10000mb' }));
  initSwagger(app);


  app.listen(PORT, '0.0.0.0', async () => {
    logger.log(`Running At: ${await app.getUrl()}`);
    logger.log(`Documentation: ${await app.getUrl()}/v2/docs`);
    logger.log(`Database is connected: ${MONGODB_URI}`);
  });
}
bootstrap();