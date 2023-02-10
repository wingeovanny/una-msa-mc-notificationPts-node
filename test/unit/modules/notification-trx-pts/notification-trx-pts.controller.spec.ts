import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@deuna/node-logger-lib';
import { NotificationTrxPtsService } from '../../../../src/modules/notification-trx-pts/notification-trx-pts.service';
import { NotificationTrxPtsController } from '../../../../src/modules/notification-trx-pts/notification-trx-pts.controller';
import { ErrorCustomizer } from '../../../../src/utils/customize-error';

import { MaybeMockedDeep } from 'ts-jest/dist/utils/testing';
import {
  mockLogTransactionDto,
  mockResponseTestRecordLog,
} from '../../../mock-data';
import { DefaultErrorException } from '@deuna/node-shared-lib';

describe('Notification-trx-pts Controller', () => {
  let controller: NotificationTrxPtsController;
  let customizeError: jest.SpyInstance;
  let notificationService: MaybeMockedDeep<NotificationTrxPtsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationTrxPtsController],
      providers: [
        {
          provide: NotificationTrxPtsService,
          useFactory: () => ({
            recordTransactionLog: jest.fn(() => 1),
          }),
        },
        {
          provide: Logger,
          useFactory: () => ({
            log: jest.fn(),
            error: jest.fn(),
            debug: jest.fn(),
          }),
        },
        ErrorCustomizer,
      ],
    }).compile();

    controller = module.get<NotificationTrxPtsController>(
      NotificationTrxPtsController,
    );
    customizeError = jest.spyOn(module.get(ErrorCustomizer), 'customizeError');
    notificationService = module.get(NotificationTrxPtsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(notificationService).toBeDefined();
    expect(customizeError).toBeDefined();
  });

  describe('recordTransactionLog', () => {
    it('should return a message indicating that the event was transmitted', async () => {
      const result = await controller.recordTransactionLog(
        mockLogTransactionDto,
      );
      expect(notificationService.recordTransactionLog).toBeCalledTimes(1);
      expect(notificationService.recordTransactionLog).toBeCalledWith(
        mockLogTransactionDto,
      );
      expect(result).toEqual(mockResponseTestRecordLog);
    });

    it('should throw an error when service do not respond correctly', async () => {
      notificationService.recordTransactionLog.mockImplementationOnce(() => {
        throw new Error('some error');
      });
      try {
        await controller.recordTransactionLog(mockLogTransactionDto);
      } catch (error) {
        expect(error).toBeInstanceOf(DefaultErrorException);
        expect(customizeError).toHaveBeenCalledTimes(1);
        expect(customizeError).toHaveBeenCalled();
      }
    });
  });
});
