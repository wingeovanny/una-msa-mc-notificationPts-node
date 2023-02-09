import { TransactionDto } from './transaction.dto';
import { publishToQueue } from '@deuna/node-shared-lib';
import { Inject, Injectable } from '@nestjs/common';
import { TRANSACCTION_PTS_RESULT } from '../../constants/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {}

  async recordTransactionLog(
    transactionLog: TransactionDto,
  ): Promise<{ status: boolean; message: string }> {
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
    return {
      status: true,
      message: `This item has been registered ${transactionLog.data} `,
    };
  }
}
