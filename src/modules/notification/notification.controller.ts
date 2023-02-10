import { TransactionDto } from './transaction.dto';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { KAFKA_NAME, SERVICE_NAME, TRANSACCTION_PTS_RESULT } from '../../constants/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Logger } from '@deuna/node-logger-lib';
import { INVALID_PAYLOAD_ERROR } from '@deuna/node-shared-lib';
import { NotificationService } from './notification.service';
import { ErrorCustomizer } from '../../utils/customize-error';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';

@ApiTags(SERVICE_NAME)
@Controller('notificationtrx')
export class NotificationController {
  constructor(
    @Inject(KAFKA_NAME)
    private readonly kafkaClient: ClientKafka,
    private readonly notificationService: NotificationService,
    private logger: Logger,
    private errorCustomizer: ErrorCustomizer,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Transmit transactions',
  })
  @ApiBadRequestResponse({
    description: INVALID_PAYLOAD_ERROR,
  })
  @ApiOkResponse({
    description: 'Transmitted Transaction successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBody({
    type: TransactionDto,
  })
  async recordTransactionLog(
    @Body() transactionDto: TransactionDto,
  ): Promise<{ status: boolean; message: string }> {
    try {
      this.logger.log(`Transmited transaction`, null);
      await this.notificationService.recordTransactionLog(transactionDto);
      return {
        status: true,
        message: `This item has been registered`,
      };
    } catch (err) {
      throw this.errorCustomizer.customizeError(err, null, null);
    }
  }
  /*
  @EventPattern(TRANSACCTION_PTS_RESULT)
  public hearLogTransaction(@Payload() payload: TransactionDto) {
    this.logger.log(payload, Controller.name);
  }*/
}
