// src/users/user.entity.ts
import {
  Entity,
  PrimaryColumn,
  Column,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid'; // Import the UUID generator function

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string = uuid(); // Assign a default UUID using the uuid() function

  @Column()
  login: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
