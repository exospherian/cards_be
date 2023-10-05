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
            throw new UnauthorizedException("no user");
        }

        let hash = await hashPass(password);

        let result = compare(user.password, hash);
        
        if(!result) {
            throw new UnauthorizedException("comparison failed");
        }

        return user;
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
