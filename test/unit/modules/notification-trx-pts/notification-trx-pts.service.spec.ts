import { Logger } from '@deuna/node-logger-lib';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { KAFKA_NAME } from '../../../../src/constants/common';
import { NotificationTrxPtsService } from '../../../../src/modules/notification-trx-pts/notification-trx-pts.service';
import { mockLogTransactionDto } from '../../../mock-data';

describe('Notification-trx-pts Service', () => {
  let service: NotificationTrxPtsService;
  const mockEmitKafka = jest.fn(() => of(true));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationTrxPtsService,
        {
          provide: KAFKA_NAME,
          useFactory: () => {
            emit: mockEmitKafka;
          },
        },
        {
          provide: Logger,
          useFactory: () => ({
            log: jest.fn(),
            error: jest.fn(),
            debug: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<NotificationTrxPtsService>(NotificationTrxPtsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Register record log transaccion', () => {
    it('given the dynamic data when the schema is correct then it should write to kafka ', async () => {
      await service.recordTransactionLog(mockLogTransactionDto);
    });
  });
});
