import { Injectable } from '@nestjs/common';
import { Profile } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class ProfileService {
    constructor (
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
        private userService: UserService,
	) {}

    getAllProfiles(): Promise<Profile[]> {
        return this.profileRepository.find();
    };

    async createProfile (userId: number, email: string, birthDate: string): Promise<Profile> {
        const user = await this.userService.getUserById(userId);
        const profile = new Profile(email, birthDate);
        profile.user = user;
        await profile.save();
        return profile;
	};

    // getProfileByUserId(userId: string): Profile {
    //     return this.profileRepository.findOne({ userId })
    // }

}
