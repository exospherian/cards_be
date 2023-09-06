import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('hello')
  getHello(@Body() { username }): string {
    return this.appService.getHello(username);
  }

  @Get('hello2')
  getHello2(@Body() { username }): string {
    return this.appService.getHello(username);
  }
}
