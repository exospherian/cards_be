import { Injectable } from '@nestjs/common';
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

    async createCard (term: string, meaning: string, author: string): Promise<Card> {
		const card = new Card(term, meaning, author);
		await card.save();
		return card;
	};
}
