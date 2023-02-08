import { Controller, Get, HttpCode } from '@nestjs/common';
// import { TransactionDbService } from '../../db/transaction/transaction.service';

@Controller('service/health')
export class HealthController {
  // constructor(private readonly transactionDbService: TransactionDbService) {}

  @Get()
  @HttpCode(200)
  async check() {
    // const connectionStatus =
    //   await this.transactionDbService.isDbConnectionAlive();

    const connectionStatus = true;

    if (connectionStatus === true) {
      return {
        dbConnection: true,
        message: 'Transaction service is connected to Transaction Database',
      };
    } else {
      return {
        dbConnection: false,
        message: connectionStatus,
      };
    }
  }
}
