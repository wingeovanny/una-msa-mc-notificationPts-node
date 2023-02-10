import { TransactionDto } from './transaction.dto';
import { publishToQueue } from '@deuna/node-shared-lib';
import { Inject, Injectable } from '@nestjs/common';

import { ClientKafka } from '@nestjs/microservices';
import { TRANSACCTION_PTS_RESULT } from '../../constants/common';
import { Logger } from '@deuna/node-logger-lib';

@Injectable()
export class NotificationTrxPtsService {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
    private readonly logger: Logger,
  ) {}

  async recordTransactionLog(transactionLog: TransactionDto): Promise<void> {
    this.logger.log(`Writing in the ${TRANSACCTION_PTS_RESULT} topic`);
    try {
      await publishToQueue(this.kafkaClient, {
        topic: TRANSACCTION_PTS_RESULT,
        value: { dataTrx: transactionLog },
        headers: {
          source: '@lxba/notificationMerchant',
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {}
  }
}
