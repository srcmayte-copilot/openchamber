import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface OpencodeServerStatus {
  running: boolean;
  port: number;
}

@Injectable()
export class OpencodeService implements OnModuleInit, OnModuleDestroy {
  private serverProcess: any = null;
  private readonly port: number;
  private readonly skipStart: boolean;

  constructor(private readonly configService: ConfigService) {
    this.port = parseInt(
      this.configService.get('OPENCODE_PORT', '3002'),
      10,
    );
    this.skipStart = this.configService.get('OPENCODE_SKIP_START', 'false') === 'true';
  }

  async onModuleInit() {
    if (!this.skipStart) {
      // Note: Actual OpenCode server start would happen here
      // For now, we assume external OpenCode server is running
      console.log(`OpenCode service initialized (port: ${this.port})`);
    }
  }

  async onModuleDestroy() {
    if (this.serverProcess) {
      // Cleanup if we started a process
      this.serverProcess = null;
    }
  }

  getServerStatus(): OpencodeServerStatus {
    return {
      running: this.skipStart || this.serverProcess !== null,
      port: this.port,
    };
  }

  getServerUrl(): string {
    return `http://localhost:${this.port}`;
  }
}
