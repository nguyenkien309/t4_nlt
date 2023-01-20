import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/base/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {
    super(repository);
  }
}
