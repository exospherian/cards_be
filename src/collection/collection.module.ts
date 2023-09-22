import { Module } from '@nestjs/common';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { Collection } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { CardModule } from '../card/card.module';


@Module({
  imports: [TypeOrmModule.forFeature(
    [
      Collection,
    ]), 
    UserModule,
    CardModule,
  ],
  controllers: [CollectionController],
  providers: [CollectionService]
})
export class CollectionModule {}
