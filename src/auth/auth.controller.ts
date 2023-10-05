import { Controller, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthDto } from './dto';
  
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signin')
    signIn(@Body() authDto: AuthDto) {
        return this.authService.signIn(authDto.username, authDto.password);
    }

    @Post('/signup') 
    signUp(@Body() authDto: AuthDto) {
        return this.authService.signUp(authDto.username, authDto.password);
    }
};
