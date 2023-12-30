import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ManageUserService } from '../manage-user/manage-user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private manageUserService: ManageUserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        try {
            const member = await this.manageUserService.getMemberByEmail(email);
    
            if (!member) {
                throw new BadRequestException('Email not found');
            }
    
            //const isPasswordValid = await bcrypt.compare(password, member.password);
            const isPasswordValid = password === member.password;

            console.log('Input password:', password);
            console.log('Stored password:', member.password);

    
            if (!isPasswordValid) {
                console.error('Invalid password for email:', email);
                throw new UnauthorizedException('Invalid credentials');
            }
    
            return member;
        } catch (error) {
            console.error('Error during validation:', error);
            throw new UnauthorizedException('Invalid credentials');
        }
    }
    
    

    async login(member: any): Promise<any> {
        const payload = { email: member.email, sub: member.id };
        const token = this.jwtService.sign(payload);
        console.log('Generated token:', token);
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
