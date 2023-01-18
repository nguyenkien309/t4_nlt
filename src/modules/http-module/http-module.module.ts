import { Module } from '@nestjs/common';
import { HttpService } from './http-module.service';

@Module({
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModuleModule {}
