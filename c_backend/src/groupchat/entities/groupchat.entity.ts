import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GroupMembers } from 'src/groupchat/entities/groupmembers.entity'; // Replace 'path-to-groupmembers-entity' with the actual path to your GroupMembers entity
//import { FileSharing } from '';

@Entity()
export class GroupChat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, name: 'group_name' })
    groupName: string;

    @Column({ type: 'varchar', length: 50, name: 'group_type' })
    groupType: string;

    @OneToMany(() => GroupMembers, groupMembers => groupMembers.groupChat)
    groupMembers: GroupMembers[];

    // @OneToMany(() => FileSharing, fileSharing => fileSharing.groupChat)
    // fileSharing: FileSharing[];
}
