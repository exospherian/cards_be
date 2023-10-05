import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities';
import { UserDto, UserViewDto } from '../user/dto';
import { plainToClass } from 'class-transformer';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}


    @Get('')
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Post('')
    async createUser(@Body() userDto: UserDto): Promise<UserViewDto> {
        let user = await this.userService.createUser(userDto.username, userDto.password);
        return plainToClass(UserViewDto, user, {
            excludeExtraneousValues: true,
        });
    }

    @Post(':id')
    async getUserById(@Param('id') id: number): Promise<UserViewDto> {
        let user = await this.userService.findUserById(id);
        return plainToClass(UserViewDto, user, {
            excludeExtraneousValues: true,
        });
    }

    //doesn't work
    //ERROR [ExceptionsHandler] invalid input syntax for type integer: "username"
    //QueryFailedError: invalid input syntax for type integer: "username"
    @Post('username')
    async getUserByUsername(@Query('username') username: string): Promise<UserViewDto> {
        let user = await this.userService.findUserByUsername(username);
        return plainToClass(UserViewDto, user, {
            excludeExtraneousValues: true,
        });
    }
  
}
