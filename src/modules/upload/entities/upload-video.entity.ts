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

@Entity({ name: 'upload-video' })
export class UploadVideoEntity extends DateAudit {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'title', nullable: true })
  title: string;

  @Column({ name: 'channel', nullable: true })
  channel: string;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'seal', nullable: true })
  seal: string;

  @Column({ name: 'url', nullable: true })
  url: string;

  @Column({ name: 'size', nullable: true })
  size: string;

  @Column({ name: 'duration', nullable: true })
  duration: string;

  @Column({ name: 'format', nullable: true })
  format: string;

  @Column({ name: 'owner', nullable: true })
  owner: string;

  constructor(partial: Partial<UploadVideoEntity>) {
    super();
    Object.assign(this, partial);
  }
}
