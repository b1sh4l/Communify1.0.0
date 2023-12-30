import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Channel')
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  channel_name: string;

  @Column({ length: 50 })
  channel_type: string;
}
