import { Module } from '@nestjs/common';

import { LoggerModule } from '@deuna/node-logger-lib';
import { ErrorCustomizer } from '../../utils/customize-error';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { KAFKA_CLIENT_CONFIG } from '../../config/kafka';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    LoggerModule.forRoot({ context: 'Transaction Module' }),
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        ...KAFKA_CLIENT_CONFIG,
      },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, ErrorCustomizer],
})
export class TransactionModule {}
