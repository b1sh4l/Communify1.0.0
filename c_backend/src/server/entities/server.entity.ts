import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ServerMembers } from 'src/server/entities/servermembers.entity';
//import { ServerChannels } from 'src/server/entities/serverchannel.entity';


@Entity()
export class Server {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, name: 'server_name' })
    serverName: string;

    @Column({ type: 'varchar', length: 50, name: 'server_type' })
    serverType: string;

    @OneToMany(() => ServerMembers, serverMember => serverMember.server)
    serverMembers: ServerMembers[];

    // @OneToMany(() => ServerChannels, serverChannels => serverChannels.server)
    // serverChannels: ServerChannels[];

    
}
