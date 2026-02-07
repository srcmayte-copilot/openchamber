import { Module } from '@nestjs/common';
import { OpencodeController } from './opencode.controller';
import { OpencodeService } from './opencode.service';

@Module({
  controllers: [OpencodeController],
  providers: [OpencodeService],
  exports: [OpencodeService],
})
export class OpencodeModule {}
