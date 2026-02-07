import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthService],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHealth', () => {
    it('should return health information', () => {
      const health = service.getHealth();
      expect(health).toHaveProperty('status');
      expect(health).toHaveProperty('timestamp');
      expect(health).toHaveProperty('uptime');
      expect(health).toHaveProperty('version');
      expect(health.status).toBe('ok');
      expect(typeof health.timestamp).toBe('string');
      expect(typeof health.uptime).toBe('number');
    });

    it('should return valid ISO timestamp', () => {
      const health = service.getHealth();
      const timestamp = new Date(health.timestamp);
      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.getTime()).not.toBeNaN();
    });

    it('should return non-negative uptime', () => {
      const health = service.getHealth();
      expect(health.uptime).toBeGreaterThanOrEqual(0);
    });
  });

  describe('isReady', () => {
    it('should return true when service is ready', () => {
      expect(service.isReady()).toBe(true);
    });
  });
});
