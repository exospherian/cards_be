import { Injectable, NotFoundException } from '@nestjs/common';
import { Card } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CardService {
    constructor (
        @InjectRepository(Card)
        private cardsRepository: Repository<Card>,
	  ) {}

    getAllCards(): Promise<Card[]> {
        return this.cardsRepository.find();
    }

    async createCard (term: string, meaning: string, author?: string): Promise<Card> {
        const card = new Card(term, meaning, author);
        await card.save();
        return card;
	  };

    async findCardByTerm(term: string): Promise<Card[]> {
        return await this.cardsRepository.find({ where : { term } });
    }

    async findCardById(id: number): Promise<Card> {
        return await this.cardsRepository.findOne({ where : { id } });
    }

    async deleteCard(id: number) {
        let card = await this.findCardById(id);
        if (card) {
            await this.cardsRepository.delete(id);
            return 'Card successfully deleted.'
        }
        throw new NotFoundException(
		    `There's no card with id '${id}'.`,
		);

    }
}
