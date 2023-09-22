import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './entity';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get('/getAllProfiles')
    getAllUsers(): Promise<Profile[]> {
        return this.profileService.getAllProfiles();
    }

    @Post('/createProfile')
    createUser(@Body() { userId, email, birthDate }) {
        return this.profileService.createProfile(userId, email, birthDate);
    }

    // @Get('/getProfileByUserId') 
    // getProfileByUserId(@Body() { userId }) {
    //     return this.profileService.getProfileByUserId(userId);
    // }
}
