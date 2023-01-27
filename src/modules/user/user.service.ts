import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';
import { LoggerService } from 'src/logger/custom.logger';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';

@Injectable()
export class UserService extends BaseService<UserEntity, UserRepository> {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    repository: UserRepository,
    logger: LoggerService,
  ) {
    super(repository, logger);
  }

  async saveUser(payload: any): Promise<UserEntity> {
    return await this._store(payload);
  }
  async findUser(payload: any): Promise<UserEntity> {
    return await this._findById(payload);
  }

  async findByEmail(username: string): Promise<UserEntity | null> {
    return await this.repository.findOne({ where: { username: username } });
  }
}
