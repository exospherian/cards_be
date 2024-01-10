import { Controller, Get, Post, Body, Delete, Put, Param, Query, UseGuards } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './entities';
import { CardDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@Controller('cards')
@ApiTags('cards')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Get('')
    getAllCards(): Promise<Card[]> {
        return this.cardService.getAllCards();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('')
    createCard(@Body() cardDto: CardDto) {
        return this.cardService.createCard(cardDto.term, cardDto.meaning, cardDto.author);
    }

    @Post('/by_term') 
    findCardByTerm(@Query('term') term: string) {      //request expects all parameters of cardDto. Can we expect only required one, term?
        return this.cardService.findCardByTerm(term);
    }

    @Delete(':id') 
    deleteCard(@Param('id') id: string): Promise<string> {
        return this.cardService.deleteCard(id);
    }

    // @Put('/updateCard')
    // updateCard(@Body() { id,  }) {
    // }
}
