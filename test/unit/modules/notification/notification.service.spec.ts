import { Logger } from '@deuna/node-logger-lib';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { KAFKA_NAME } from '../../../../src/constants/common';
import { NotificationService } from '../../../../src/modules/notification/notification.service';
import { mockLogTransactionDto } from '../../../mock-data';

describe('Notification Service', () => {
  let service: NotificationService;
  const mockEmitKafka = jest.fn(() => of(true));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
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

    service = module.get<NotificationService>(NotificationService);
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
