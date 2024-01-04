import { Module, Provider } from '@nestjs/common';
import { Redis } from 'ioredis';


const redisClient: Provider =  {
    provide: "REDIS_CLIENT",
    useValue: new Redis(),
  };

@Module({
    imports: [],
    providers: [redisClient],
    exports: [redisClient],
    controllers: [],
  })
export class RedisModule {}
