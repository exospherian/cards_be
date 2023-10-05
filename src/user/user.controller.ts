import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities';
import { UserDto } from '../user/dto/user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('')
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Post('')
    createUser(@Body() userDto: UserDto) {
        return this.userService.createUser(userDto.username, userDto.password);
    }

    @Post('/getUserById')
    getUserById(@Query() username: string) {
        return this.userService.findUserByUsername(username);
    }

    @Post('/createUser')
    getUserByUsername(@Body() userDto: UserDto) {
        return this.userService.createUser(userDto.username, userDto.password);
    }
  
}
