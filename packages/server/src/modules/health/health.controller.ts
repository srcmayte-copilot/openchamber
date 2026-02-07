import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import type { HealthStatus } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  check(): HealthStatus {
    return this.healthService.getHealth();
  }

  @Get('ready')
  ready(): { ready: boolean } {
    return { ready: this.healthService.isReady() };
  }
}
