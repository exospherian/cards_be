import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities';
import { hashPass } from './hash';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private userService: UserService) {}

    async signIn(username: string, password: string): Promise<any> {

        const user = await this.userService.findUserByUsername(username);
        
        if(!user) {
            throw new UnauthorizedException();
        }

        let hash = await hashPass(password);

        // if (user?.password !== hash) {
        //     throw new UnauthorizedException();
        // }
        let result = await compare(hash, user.password);
        
        if(!result) {
            throw new UnauthorizedException();
        }

        return user;
    }

    async signUp(username: string, password: string): Promise<User> {

        let user = await this.userService.findUserByUsername(username);

        if(user) {
            throw new UnauthorizedException();
        }
        
        let hash = await hashPass(password);
        user = await this.userService.createUser(username, hash);

        return user;
    }
}
