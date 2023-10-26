import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities';
import { hashPass } from './hash';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
        ) {}

    async signIn(username: string, password: string): Promise<any> {

        const user = await this.userService.findUserByUsername(username);
        
        if(!user) {
            throw new UnauthorizedException("no user");
        }

        let hash = await hashPass(password);

        let result = compare(user.password, hash);
        
        if(!result) {
            throw new UnauthorizedException("comparison failed");
        }

        const payload = { sub: user.id, username: user.username };
        let accessToken = {
            access_token: await this.jwtService.signAsync(payload),
        }
        console.log(accessToken); 

        return accessToken;
    }

    async signUp(username: string, password: string): Promise<User> {

        let user = await this.userService.findUserByUsername(username);

        if(user) {
            throw new UnauthorizedException("user already exists");
        }
        
        let hash = await hashPass(password);
        user = await this.userService.createUser(username, hash);

        return user;
    }
}
