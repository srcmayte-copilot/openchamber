import { Test, TestingModule } from '@nestjs/testing';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

describe('SettingsController', () => {
  let controller: SettingsController;
  let service: SettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettingsController],
      providers: [
        {
          provide: SettingsService,
          useValue: {
            getAll: jest.fn().mockReturnValue({ theme: 'dark' }),
            get: jest.fn().mockReturnValue('dark'),
            set: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SettingsController>(SettingsController);
    service = module.get<SettingsService>(SettingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all settings', () => {
      const result = controller.getAll();
      expect(result).toEqual({ theme: 'dark' });
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('should return a specific setting', () => {
      const result = controller.get('theme');
      expect(result).toEqual({ value: 'dark' });
      expect(service.get).toHaveBeenCalledWith('theme');
    });
  });

  describe('update', () => {
    it('should update a setting', () => {
      const result = controller.update('theme', { value: 'light' });
      expect(result).toEqual({ success: true });
      expect(service.set).toHaveBeenCalledWith('theme', 'light');
    });
  });

  describe('delete', () => {
    it('should delete a setting', () => {
      const result = controller.delete('theme');
      expect(result).toEqual({ success: true });
      expect(service.delete).toHaveBeenCalledWith('theme');
    });
  });
});
