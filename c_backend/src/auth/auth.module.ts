import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ManageUserModule } from '../manage-user/manage-user.module';

@Module({
    imports: [
        PassportModule,
        ManageUserModule,
        JwtModule.register({
            secret: 'sgvbdshbdbd214232', 
            signOptions: { expiresIn: '7d' }, 
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
