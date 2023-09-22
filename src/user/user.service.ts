import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { UserStorage } from './user.storage';

@Injectable()
export class UserService {
    constructor (
        private userStorage: UserStorage,
	  ) {}

    getAllUsers(): Promise<User[]> {
        return this.userStorage.findAll();
    }

    async createUser (username: string, password: string): Promise<User> {
        return this.userStorage.createUser(username, password);
	};

    getUserById(userId: number): Promise<User> {
        return this.userStorage.findOneById(userId);
    }

}
