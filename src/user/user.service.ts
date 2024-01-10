import { Injectable } from '@nestjs/common';
import { User } from './entities';
import { UserStorage } from './user.storage';

@Injectable()
export class UserService {
    constructor (
        private userStorage: UserStorage,
	  ) {}

    async getAllUsers(): Promise<User[]> {
        return await this.userStorage.findAll();
    }

    async createUser (username: string, hash: string): Promise<User> {
        return await this.userStorage.createUser(username, hash);
	};

    async findUserById(userId: string): Promise<User> {
        return await this.userStorage.findOneById(userId);
    }

    async findUserByUsername(username: string): Promise<User> {
        return await this.userStorage.findUserByUsername(username);
    }

}
