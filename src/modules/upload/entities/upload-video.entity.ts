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
} from 'typeorm';

export class UploadVideoEntity extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'uid', nullable: true })
  uid: string;

  @Column({ name: 'title', nullable: true })
  title: string;

  @Column({ name: 'channel', nullable: true })
  channel: string;

  @Column({ name: 'owner', nullable: true })
  owner: string;
}
