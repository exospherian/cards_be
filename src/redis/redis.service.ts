import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
    constructor(@Inject("REDIS_CLIENT") private readonly redisClient: Redis) {}

    async get(prefix: string, key: string): Promise<string | null> {
        return this.redisClient.get(`${prefix}:${key}`);
    }

    async set(prefix: string, key: string, value: string): Promise<void> {
        await this.redisClient.set(`${prefix}:${key}`, value);
    }

    async delete(prefix: string, key: string): Promise<void> {
        await this.redisClient.del(`${prefix}:${key}`);
    }

}
