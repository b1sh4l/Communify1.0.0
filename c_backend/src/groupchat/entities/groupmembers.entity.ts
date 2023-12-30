import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { GroupChat } from "src/groupchat/entities/groupchat.entity";
import { Member } from "src/manage-user/entities/manage-user.entity";

@Entity("GroupMembers")
export class GroupMembers {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => GroupChat, groupChat => groupChat.groupMembers)
    groupChat: GroupChat;

    @ManyToOne(() => Member, member => member.groupMembers)
    member: Member;
}
