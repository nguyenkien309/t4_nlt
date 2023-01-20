import { UserService } from './../user/user.service';
import { HttpModule } from '@nestjs/axios';
import { Module, CacheModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '../redis/redis.module';
import { UserModule } from '../user/user.module';
import { UserController } from '../user/user.controller';
import { UserRepository } from '../user/user.repository';
import { LoggerService } from 'src/logger/custom.logger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [ConfigModule, HttpModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, LoggerService],
  exports: [AuthService],
})
export class AuthModule {}
