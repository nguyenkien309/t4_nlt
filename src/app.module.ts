import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { RedisModule } from './modules/redis/redis.module';
import { UploadModule } from './modules/upload/upload.module';
import { HttpServiceInterceptor } from './modules/http-module/http-module.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ValidatorsModule } from './validators/validators.module';
dotenv.config();

@Module({
  imports: [
    DatabaseModule,
    UploadModule,
    AuthModule,
    UserModule,
    RedisModule,
    ValidatorsModule,
    HttpModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get<string>('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT'),
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpServiceInterceptor,
    },
  ],
})
export class AppModule {}
