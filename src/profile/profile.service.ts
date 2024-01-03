import { Injectable } from '@nestjs/common';
import { Profile } from './entities';
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

    async createProfile (userId: string, email: string, birthDate: string): Promise<Profile> {
        const user = await this.userService.findUserById(userId);
        const profile = new Profile(email, birthDate);
        profile.user = user;
        await profile.save();
        return profile;
	};

    // getProfileByUserId(userId: string): Profile {
    //     return this.profileRepository.findOne({ userId })
    // }

}
