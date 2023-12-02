import { Entity, PrimaryColumn, Column } from 'typeorm';
import { v4 as uuid } from 'uuid'; // Import the UUID generator function

@Entity()
export class Artist {
  @PrimaryColumn('uuid')
  id: string = uuid(); // Assign a default UUID using the uuid() function

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
