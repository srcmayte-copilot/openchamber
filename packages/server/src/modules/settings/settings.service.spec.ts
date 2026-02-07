import { Test, TestingModule } from '@nestjs/testing';
import { SettingsService } from './settings.service';
import { ConfigService } from '@nestjs/config';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettingsService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SettingsService>(SettingsService);
    // Clear defaults for testing
    service['settings'] = {};
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should return undefined for non-existent setting', () => {
      const result = service.get('nonExistent');
      expect(result).toBeUndefined();
    });

    it('should return default value for non-existent setting', () => {
      const result = service.get('nonExistent', 'default');
      expect(result).toBe('default');
    });

    it('should return existing setting value', () => {
      service.set('testKey', 'testValue');
      const result = service.get('testKey');
      expect(result).toBe('testValue');
    });
  });

  describe('set', () => {
    it('should set a new setting', () => {
      service.set('newKey', 'newValue');
      expect(service.get('newKey')).toBe('newValue');
    });

    it('should update an existing setting', () => {
      service.set('key', 'value1');
      service.set('key', 'value2');
      expect(service.get('key')).toBe('value2');
    });

    it('should handle different value types', () => {
      service.set('string', 'text');
      service.set('number', 42);
      service.set('boolean', true);
      service.set('object', { nested: 'value' });

      expect(service.get('string')).toBe('text');
      expect(service.get('number')).toBe(42);
      expect(service.get('boolean')).toBe(true);
      expect(service.get('object')).toEqual({ nested: 'value' });
    });
  });

  describe('getAll', () => {
    it('should return empty object when no settings', () => {
      const result = service.getAll();
      expect(result).toEqual({});
    });

    it('should return all settings', () => {
      service.set('key1', 'value1');
      service.set('key2', 'value2');
      const result = service.getAll();
      expect(result).toEqual({
        key1: 'value1',
        key2: 'value2',
      });
    });
  });

  describe('delete', () => {
    it('should delete an existing setting', () => {
      service.set('toDelete', 'value');
      expect(service.get('toDelete')).toBe('value');
      service.delete('toDelete');
      expect(service.get('toDelete')).toBeUndefined();
    });

    it('should handle deleting non-existent setting', () => {
      expect(() => service.delete('nonExistent')).not.toThrow();
    });
  });
});
