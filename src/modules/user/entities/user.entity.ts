import { DateAudit } from 'src/base/date_audit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends DateAudit {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'username', nullable: true })
  username: string;

  @Column({ name: 'access_token', nullable: true })
  access_token: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: 'partner', nullable: true })
  role: string;

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
