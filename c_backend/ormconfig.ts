import { Member } from "src/manage-user/entities/manage-user.entity";
import { Server } from "src/server/entities/server.entity";
import { ServerMembers } from "src/server/entities/servermembers.entity";
import { GroupChat } from "src/groupchat/entities/groupchat.entity";
import { GroupMembers } from "src/groupchat/entities/groupmembers.entity";
import { DirectMessage } from "src/directmessage/entities/directmessage.entity";
import { Channel } from 'src/channel/entities/channel.entity';
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";



const Config: PostgresConnectionOptions = {
    type: "postgres",
    database: "Communify",
    host: "localhost",
    port: 5000,
    username: "postgres",
    password: 'Bishal101',
    entities: [Member, DirectMessage, GroupChat, GroupMembers, Channel, Server, ServerMembers],
    synchronize: true,
    extra: {
        autoLoadEntities: true,
        logging: true
      },
}

export default Config;