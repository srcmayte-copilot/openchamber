import { Injectable } from '@nestjs/common';

export interface HealthStatus {
  status: string;
  timestamp: string;
  uptime: number;
  version: string;
}

@Injectable()
export class HealthService {
  private readonly startTime: number;

  constructor() {
    this.startTime = Date.now();
  }

  getHealth(): HealthStatus {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: (Date.now() - this.startTime) / 1000,
      version: process.env.npm_package_version || '1.6.5',
    };
  }

  isReady(): boolean {
    // For now, always ready. Can add checks for database, OpenCode, etc.
    return true;
  }
}
