import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
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

    @Get('/findCardByTerm') 
    findCardByTerm(@Body() { term }) {
        return this.cardService.findCardByTerm(term);
    }

    @Delete('/deleteCard') 
    deleteCard(@Body() { id }) {
        return this.cardService.deleteCard(id);
    }

    @Put('/updateCard')
    updateCard(@Body() { id,  }) {
    }
}
