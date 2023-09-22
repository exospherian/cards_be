import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entity'
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature(
    [
      Profile,
    ]),
    UserModule,
  ],
  providers: [
    ProfileService, 
  ],
  exports: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
