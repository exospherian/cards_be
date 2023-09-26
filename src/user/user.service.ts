import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

    async createUser (username: string, password: string): Promise<User> {
        return this.userStorage.createUser(username, password);
	};

    async getUserById(userId: number): Promise<User> {
        return await this.userStorage.findOneById(userId);
    }

    async findUserByUsername(username: string): Promise<User> {
        return await this.userStorage.findUserByUsername(username);
    }

}
