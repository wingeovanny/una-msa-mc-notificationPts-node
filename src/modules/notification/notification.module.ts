import { Module } from '@nestjs/common';

import { LoggerModule } from '@deuna/node-logger-lib';
import { ErrorCustomizer } from '../../utils/customize-error';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

@Module({
  imports: [LoggerModule.forRoot({ context: 'Transaction Module' })],
  controllers: [NotificationController],
  providers: [NotificationService, ErrorCustomizer],
})
export class TransactionModule {}
