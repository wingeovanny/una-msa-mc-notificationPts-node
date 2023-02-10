import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/service-configuration';
import { MetaServiceModule } from './modules/meta-service/meta-service.module';
import { LoggerModule } from '@deuna/node-logger-lib';
import { ALL_EXCEPTION_FILTERS_FOR_PROVIDER } from '@deuna/node-shared-lib';
import { NotificationTrxPtsModule } from './modules/notification-trx-pts/notification-trx-pts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
      load: [configuration],
    }),
    MetaServiceModule,
    NotificationTrxPtsModule,
    LoggerModule.forRoot({ context: 'WebHook Transaction Service' }),
  ],
  providers: [...ALL_EXCEPTION_FILTERS_FOR_PROVIDER],
})
export class WebHookTransactionServiceModule {}
