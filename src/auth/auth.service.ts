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

        await this.authRedisStorage.set(user.id, tokens.refreshToken);

        return tokens;
    }

    async refreshToken(token: string) {
        let decodedToken = await this.verifyToken(token);
        await this.verifyAuthSession(decodedToken.sub, token);
        let payload = { sub: decodedToken.sub, username: decodedToken.username };
        //update refresh token in redis too, DONT FORGET
        return await this.jwtService.signAsync(payload);
    }

    async verifyToken(token: string) {
        try {
            return this.jwtService.verifyAsync(token);
        } catch (error) {
            throw new UnauthorizedException('Invalid token.');
        }
    }

    //works only for 1 device. Should be able to work on multiple devices. 
    async verifyAuthSession(id: string, token: string) {
        try {
            let tokenFromRedis = await this.authRedisStorage.get(id);
            if(tokenFromRedis === token) {
                return true;
            }
        } catch (error) {
            throw new UnauthorizedException('No such token.')
        }
    }

    async signUp(username: string, password: string): Promise<User> {

        let user = await this.userService.findUserByUsername(username);

        if(user) {
            throw new UnauthorizedException("User already exists");
        }
        
        let hash = await hashPass(password);
        user = await this.userService.createUser(username, hash);

        return user;
    }
}
