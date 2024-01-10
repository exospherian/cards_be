import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities';
import { hashPass } from './hash';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthRedisStorage } from './auth.redis.storage';
import { IJwtTokens } from './JWT/interfaces/jwt.tokens.inerface';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private authRedisStorage: AuthRedisStorage,
        ) {}

    async signIn(username: string, password: string): Promise<IJwtTokens> {

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
        let tokens = {
            accessToken: await this.jwtService.signAsync(payload),
            refreshToken: await this.jwtService.signAsync(payload)
        }

        await this.authRedisStorage.set(user.id, tokens.accessToken);

        //where should I check if token was setup successfully? 
        //here (throw new Exception or smth like that or in the auth.redis.storage?)

        return tokens;
    }

    async refreshToken() {

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
