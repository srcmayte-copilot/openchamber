import { Test, TestingModule } from '@nestjs/testing';
import { OpencodeService } from './opencode.service';
import { ConfigService } from '@nestjs/config';

describe('OpencodeService', () => {
  let service: OpencodeService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpencodeService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string, defaultValue?: any) => {
              const config = {
                OPENCODE_PORT: '3002',
                OPENCODE_SKIP_START: 'false',
              };
              return config[key] || defaultValue;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<OpencodeService>(OpencodeService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getServerStatus', () => {
    it('should return server status', () => {
      const status = service.getServerStatus();
      expect(status).toHaveProperty('running');
      expect(status).toHaveProperty('port');
      expect(typeof status.running).toBe('boolean');
    });
  });

  describe('getServerUrl', () => {
    it('should return server URL', () => {
      const url = service.getServerUrl();
      expect(url).toBeDefined();
      expect(typeof url).toBe('string');
      expect(url).toMatch(/^http:\/\/localhost:\d+$/);
    });
  });
});
