import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './JWT/constants';
import { RedisModule } from '../redis/redis.module';
import { AuthRedisStorage } from './auth.redis.storage';

@Module({
  imports: [UserModule,
    JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1000s' },
    }),
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRedisStorage]
})
export class AuthModule {}
