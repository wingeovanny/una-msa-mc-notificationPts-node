// call initially to setup app env vars
import {
  setupEnvConfig,
  AuditInterceptor,
  registerSwagger,
} from '@deuna/node-shared-lib';
setupEnvConfig();
import { NestFactory } from '@nestjs/core';
import { Logger } from '@deuna/node-logger-lib';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

import { SERVICE_NAME } from './src/constants/common';
import { NotificationServiceModule } from './src/notification-service.module';

const logger = new Logger({ context: 'Notification Service' });

async function bootstrap() {
  const app = await NestFactory.create(NotificationServiceModule);
  if (process.env.ENABLE_AUDIT === 'true') {
    app.useGlobalInterceptors(new AuditInterceptor(SERVICE_NAME));
  }
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
  registerSwagger(app, SERVICE_NAME);
  console.log(process.env.ENABLE_AUDIT);

  await app.listen(process.env.NOTIFICATION_SERVICE_PORT);
  logger.log(`Microservice is listening on: ${await app.getUrl()}`);
}
bootstrap();
