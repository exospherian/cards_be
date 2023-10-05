import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './entities';
import { CardDto } from './dto';

@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Get('/getAllCards')
    getAllCards(): Promise<Card[]> {
        return this.cardService.getAllCards();
    }

    @Post('/createCard')
    createCard(@Body() cardDto: CardDto) {
        return this.cardService.createCard(cardDto.term, cardDto.meaning, cardDto.author);
    }

    @Post('/findCardByTerm') 
    findCardByTerm(@Body() cardDto: CardDto) {      //request expects all parameters of cardDto. Can we expect only required one, term?
        return this.cardService.findCardByTerm(cardDto.term);
    }

    @Delete('/deleteCard') 
    deleteCard(@Body() { id }) {
        return this.cardService.deleteCard(id);
    }

    @Put('/updateCard')
    updateCard(@Body() { id,  }) {
    }
}
