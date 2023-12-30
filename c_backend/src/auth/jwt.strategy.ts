import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'sgvbdshbdbd214232',
        });
    }

    async validate(payload: any): Promise<any> {
        return { id: payload.sub, email: payload.email };
    }
}
