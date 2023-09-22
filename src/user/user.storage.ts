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

    async createUser (username: string, password: string): Promise<User> {
        const user = new User(username, password);
        await user.save();
        return user;
	};

    findOneById(userId: number): Promise<User> {
        return this.usersRepository.findOne({ where: { id: userId } });
    }

}