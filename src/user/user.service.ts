import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User)
        private usersRepository: Repository<User>,
	) {}

    getAllUsers(): Promise<User[]> {
        return this.usersRepository.find();
      }

    async createUser (username: string): Promise<User> {
		const user = new User(username);
		await user.save();
		return user;
	};

}
