import {
  BaseEntity,
  EntityManager,
  FindOptionsOrder,
  FindOptionsWhere,
  In,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { LoggerService } from 'src/logger/custom.logger';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IBaseService } from './i.base.service';
import { EntityId } from 'typeorm/repository/EntityId';
import qs from 'qs';

export class BaseService<T extends BaseEntity, R extends Repository<T>>
  implements IBaseService<T>
{
  protected readonly repository: R;
  protected readonly logger: LoggerService;

  constructor(repository: R, logger: LoggerService) {
    this.repository = repository;
    this.logger = logger;
  }

  /**
   *
   * @param deleted
   * @returns
   */
  async _countByDeleted(deleted: boolean): Promise<number | null> {
    return await this.repository.count({
      where: { deleted: deleted } as unknown as FindOptionsWhere<T>,
    });
  }

  /**
   *
   * @param id
   * @param data
   * @returns
   */
  async _update(
    id: EntityId,
    data: QueryDeepPartialEntity<T>,
  ): Promise<T | null> {
    await this.repository.update(id, data as QueryDeepPartialEntity<T>);
    return await this.repository.findOne({
      where: { id: id } as unknown as FindOptionsWhere<T>,
    });
  }

  /**
   *
   * @param id
   * @returns
   */
  async _softDelete(id: EntityId): Promise<T | null> {
    await this.repository.update(id, {
      deleted: true,
    } as unknown as QueryDeepPartialEntity<T>);
    return await this.repository.findOne({
      where: { id: id } as unknown as FindOptionsWhere<T>,
    });
  }

  /**
   *
   * @param id
   * @returns
   */
  async _restore(id: EntityId): Promise<T | null> {
    await this.repository.update(id, {
      deleted: false,
    } as unknown as QueryDeepPartialEntity<T>);
    return await this.repository.findOne({
      where: { id: id } as unknown as FindOptionsWhere<T>,
    });
  }

  /**
   *
   * @param id
   * @returns
   */
  async _destroy(id: EntityId): Promise<T | null> {
    const entity = await this._findById(id);
    await this.repository.delete(id);
    return entity;
  }

  // USER

  /**
   *
   * @param data
   * @returns
   */
  async _store(data: any): Promise<T | null> {
    return this.repository.save(data, { transaction: true });
  }

  /**
   *
   * @param id
   * @returns
   */
  async _findById(id: EntityId): Promise<T | null> {
    return this.repository.findOne({
      where: { id: id } as unknown as FindOptionsWhere<T>,
    });
  }

  /**
   *
   * @param ids
   * @returns
   */
  async _findByIds(ids: [EntityId]): Promise<T[] | null> {
    return this.repository.find({
      where: { id: In(ids) } as unknown as FindOptionsWhere<T>,
    });
  }

  /**
   *
   * @param second
   * @returns
   */
  async currentTimestamp(second = true): Promise<number> {
    const date = new Date();
    if (second) {
      const now = Math.floor(date.getTime() / 1000);
      return now;
    }
    return Date.now();
  }
}
