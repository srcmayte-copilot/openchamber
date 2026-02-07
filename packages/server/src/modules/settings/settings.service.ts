import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SettingsService {
  private settings: Record<string, any> = {};

  constructor(private readonly configService: ConfigService) {
    // Initialize with default settings
    this.loadDefaults();
  }

  private loadDefaults() {
    // Default settings can be loaded here
    this.settings = {
      theme: 'dark',
      fontSize: 14,
      autoSave: true,
    };
  }

  get<T = any>(key: string, defaultValue?: T): T | undefined {
    return this.settings[key] !== undefined
      ? this.settings[key]
      : defaultValue;
  }

  set(key: string, value: any): void {
    this.settings[key] = value;
  }

  getAll(): Record<string, any> {
    return { ...this.settings };
  }

  delete(key: string): void {
    delete this.settings[key];
  }
}
