import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UserController } from './user.controller';
import { UserStorage } from './user.storage';

@Module({
  imports: [TypeOrmModule.forFeature(
    [
      User,
    ]),
  ],
  providers: [UserService, UserStorage],
  exports: [UserService, UserStorage],
  controllers: [UserController],
})
export class UserModule {}
