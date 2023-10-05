import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './entities';
import { ProfileDto } from './dto';

@Controller('profiles')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get('')
    getAllUsers(): Promise<Profile[]> {
        return this.profileService.getAllProfiles();
    }


    @Post('/create')
    createUser(@Param('id') id: number, @Body() profileDto: ProfileDto) {
        return this.profileService.createProfile(id, profileDto.email, profileDto.birthDate);
    }

    // @Get('/getProfileByUserId') 
    // getProfileByUserId(@Body() { userId }) {
    //     return this.profileService.getProfileByUserId(userId);
    // }
}
