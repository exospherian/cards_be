import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities';
import { UserModule } from './user/user.module';
import { CardModule } from './card/card.module';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/entity';
import { Card } from './card/entities';
import { CollectionModule } from './collection/collection.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0blivion92',
      database: 'cards',
      entities: [User, Card, Profile],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    CardModule, 
    ProfileModule, 
    CollectionModule,
  ],
  exports: [
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
