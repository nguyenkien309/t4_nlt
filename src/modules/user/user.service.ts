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

  findById(id: EntityId): Promise<UserEntity> {
    return this.findById(id);
  }

  findByEmail(username: string): Promise<UserEntity | null> {
    return this.repository.findOne({ where: { username: username } });
  }
}
