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

    //doesn't work. 
    //ERROR [ExceptionsHandler] duplicate key value violates unique constraint "UQ_a24972ebd73b106250713dcddd9"
    //QueryFailedError: duplicate key value violates unique constraint "UQ_a24972ebd73b106250713dcddd9"
    @Post('')
    async createUser(
        @Param('id') id: number, 
        @Body() profileDto: ProfileDto): Promise<ProfileDto> {
            return await this.profileService.createProfile(id, profileDto.email, profileDto.birthDate);
    }

    // @Get('/getProfileByUserId') 
    // getProfileByUserId(@Body() { userId }) {
    //     return this.profileService.getProfileByUserId(userId);
    // }
}
