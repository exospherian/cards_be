import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/getAllUsers')
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Post('/createUser')
    createUser(@Body() { username, password }) {
        return this.userService.createUser(username, password);
    }
  
}
