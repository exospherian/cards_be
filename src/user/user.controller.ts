import { Controller, Get, Post, Body, Query, Param, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities';
import { UserDto, UserViewDto } from '../user/dto';
import { plainToClass } from 'class-transformer';
import { Redis } from 'ioredis';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService, 
                @Inject("REDIS_CLIENT") private readonly  redisClient: Redis,
                ) {}


    @Get('')
    async getAllUsers(): Promise<User[]> {
        const kek = await this.redisClient.get('kek');
        console.log(kek);
        await this.redisClient.incr('kek');
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
