import { Controller, Get, Post, Body } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './entities';

@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Get('/getAllCards')
    getAllCards(): Promise<Card[]> {
        return this.cardService.getAllCards();
    }

    @Post('/createCard')
    createCard(@Body() { term, meaning, author }) {
        return this.cardService.createCard(term, meaning, author);
    }
}
