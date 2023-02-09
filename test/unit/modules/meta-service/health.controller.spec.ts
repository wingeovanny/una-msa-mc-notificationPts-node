import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '../../../../src/modules/meta-service/health.controller';

describe('Autorizer Service health controller', () => {
  let controller: HealthController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();
    controller = module.get(HealthController);
  });

  it('should return that the service is healthy', async () => {
    const res = await controller.check();
    expect(res.dbConnection).toBe(true);
  });
});
