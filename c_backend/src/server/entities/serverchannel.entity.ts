// import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
// import { Server } from 'src/server/entities/server.entity';
// import { Channel } from 'src/channel/entities/channel.entity';


//  @Entity()
// export class ServerChannels {
//   @PrimaryGeneratedColumn()
//   id: number;
  
//   @ManyToOne(() => Server, server => server.serverChannels)
//   @JoinColumn({ name: 'server_id' })
//   server: Server;

//   @ManyToOne(() => Channel, channel => channel.serverChannels)
//   @JoinColumn({ name: 'channel_id' })
//   channel: Channel;

// }