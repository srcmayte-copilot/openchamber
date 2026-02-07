import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let controller: HealthController;
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('check', () => {
    it('should return health status', () => {
      const result = controller.check();
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('uptime');
      expect(result).toHaveProperty('version');
      expect(result.status).toBe('ok');
    });
  });

  describe('ready', () => {
    it('should return readiness status when ready', () => {
      jest.spyOn(service, 'isReady').mockReturnValue(true);
      const result = controller.ready();
      expect(result).toHaveProperty('ready');
      expect(result.ready).toBe(true);
    });

    it('should return readiness status when not ready', () => {
      jest.spyOn(service, 'isReady').mockReturnValue(false);
      const result = controller.ready();
      expect(result.ready).toBe(false);
    });
  });
});
