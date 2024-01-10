import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';

@Injectable()
export class UserStorage {
    constructor (
        @InjectRepository(User)
        private usersRepository: Repository<User>,
	  ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async createUser (username: string, hash: string): Promise<User> {
        const user = new User(username, hash);
        await user.save();
        return user;
	};

    findOneById(userId: string): Promise<User> {
        return this.usersRepository.findOne({ where: { id: userId } });
    } 

    findUserByUsername(username: string): Promise<User> {
        return this.usersRepository.findOne({ where: { username }});
    }

}