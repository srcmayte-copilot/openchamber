import { Controller, Get } from '@nestjs/common';
import { OpencodeService } from './opencode.service';
import type { OpencodeServerStatus } from './opencode.service';

@Controller('opencode')
export class OpencodeController {
  constructor(private readonly opencodeService: OpencodeService) {}

  @Get('status')
  getStatus(): OpencodeServerStatus {
    return this.opencodeService.getServerStatus();
  }

  @Get('url')
  getServerUrl(): { url: string } {
    return { url: this.opencodeService.getServerUrl() };
  }
}
