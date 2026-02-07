import { Test, TestingModule } from '@nestjs/testing';
import { OpencodeController } from './opencode.controller';
import { OpencodeService } from './opencode.service';

describe('OpencodeController', () => {
  let controller: OpencodeController;
  let service: OpencodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpencodeController],
      providers: [
        {
          provide: OpencodeService,
          useValue: {
            getServerStatus: jest.fn().mockReturnValue({
              running: true,
              port: 3002,
            }),
            getServerUrl: jest.fn().mockReturnValue('http://localhost:3002'),
          },
        },
      ],
    }).compile();

    controller = module.get<OpencodeController>(OpencodeController);
    service = module.get<OpencodeService>(OpencodeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getStatus', () => {
    it('should return OpenCode server status', () => {
      const result = controller.getStatus();
      expect(result).toHaveProperty('running');
      expect(result).toHaveProperty('port');
      expect(service.getServerStatus).toHaveBeenCalled();
    });
  });

  describe('getServerUrl', () => {
    it('should return OpenCode server URL', () => {
      const result = controller.getServerUrl();
      expect(result).toHaveProperty('url');
      expect(result.url).toBe('http://localhost:3002');
      expect(service.getServerUrl).toHaveBeenCalled();
    });
  });
});
