import {
  BaseEntity,
  EntityManager,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import qs from 'qs';

export class BaseRepository<T extends BaseEntity> extends Repository<T> {
  protected _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    super(repository.target, repository.manager);
    this._repository = repository;
  }

  async transactionWrap(
    operation: (...args) => unknown,
    manager?: EntityManager,
  ) {
    if (manager != undefined && manager != null) {
      return await operation(manager);
    } else {
      return await this._repository.manager.transaction(async (manager) => {
        return await operation(manager);
      });
    }
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
