import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities';

@Injectable()
export class AuthService {

    constructor(private userService: UserService) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userService.findUserByUsername(username);

        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const { password, ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return result;
    }

    async signUp(username: string, password: string): Promise<User> {

        let user = await this.userService.findUserByUsername(username);

        if(user) {
            throw new UnauthorizedException();
        }
        
        user = await this.userService.createUser(username, password);

        return user;
    }
}
