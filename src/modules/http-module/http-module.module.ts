import { Module } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Module({
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModuleModule {}
