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

@Entity({ name: 'public-video' })
export class PublicVideoEntity extends DateAudit {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'title', nullable: true })
  title: string;

  @Column({ name: 'channel', nullable: true })
  channel: string;

  @Column({ name: 'owner', nullable: true })
  owner: string;

  constructor(partial: Partial<PublicVideoEntity>) {
    super();
    Object.assign(this, partial);
  }
}
