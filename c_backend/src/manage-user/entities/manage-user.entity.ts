import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { DirectMessage } from 'src/directmessage/entities/directmessage.entity'; 
import { GroupMembers } from 'src/groupchat/entities/groupmembers.entity'; 
import { ServerMembers } from 'src/server/entities/servermembers.entity'; 
//import { ChannelMembers } from 'src/channel/entities/channelmembers.entity'; 

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 255 })
    firstname: string;

    @Column({ type: 'varchar', length: 255 })
    lastname: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 15, unique: true })
    mobileno: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    profile_picture: string;

    @Column({ type: 'timestamp' })
    member_since: Date;

    @Column({ type: 'varchar', length: 50 })
    role: string;

    @Column({ type: 'boolean' })
    is_banned: boolean;

    @OneToMany(() => DirectMessage, directMessage => directMessage.sender)
    sentMessages: DirectMessage[];

    @OneToMany(() => DirectMessage, directMessage => directMessage.receiver)
    receivedMessages: DirectMessage[];

    @OneToMany(() => GroupMembers, groupMember => groupMember.member)
    groupMembers: GroupMembers[];

    @OneToMany(() => ServerMembers, serverMember => serverMember.member)
    serverMembers: ServerMembers[];

    // @OneToMany(() => ChannelMembers, channelMembers => channelMembers.member)
    // @JoinColumn({ name: 'member_id' }) 
    // channelMembers: ChannelMembers[];

    // @OneToMany(() => ChannelMembers, channelMember => channelMember.member)
    // channelMembers: ChannelMembers[];
}
