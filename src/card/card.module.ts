import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from './card.controller';
import { Card } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(
    [
      Card,
    ]),
  ],
  providers: [CardService],
  exports: [CardService],
  controllers: [CardController],
})
export class CardModule {}
