import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Member } from 'src/manage-user/entities/manage-user.entity'; // Update the path accordingly

@Entity('DirectMessages') // Specify the table name if it differs from the entity name
export class DirectMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sender_id' })
  sender: Member;

  @ManyToOne(() => Member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'receiver_id' })
  receiver: Member;

  @Column({ type: 'text', name: 'message_content' })
  messageContent: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'timestamp' })
  timestamp: Date;
}
