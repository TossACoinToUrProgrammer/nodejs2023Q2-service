import { Entity, PrimaryColumn, Column } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Track {
  @PrimaryColumn('uuid')
  id: string = uuid(); // Assign a default UUID using the uuid() function

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;
}
