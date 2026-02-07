import { Controller, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getAll(): Record<string, any> {
    return this.settingsService.getAll();
  }

  @Get(':key')
  get(@Param('key') key: string): { value: any } {
    return { value: this.settingsService.get(key) };
  }

  @Put(':key')
  update(
    @Param('key') key: string,
    @Body() body: { value: any },
  ): { success: boolean } {
    this.settingsService.set(key, body.value);
    return { success: true };
  }

  @Delete(':key')
  delete(@Param('key') key: string): { success: boolean } {
    this.settingsService.delete(key);
    return { success: true };
  }
}
