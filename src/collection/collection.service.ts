import { Injectable  } from '@nestjs/common';
import { Collection } from '../collection/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Card } from '../card/entities';
import { CardService } from '../card/card.service';


@Injectable()
export class CollectionService {
    constructor(
        @InjectRepository(Collection)
        private collectionRepository: Repository<Collection>,
        private userService: UserService,
        private cardService: CardService,
      ) {}
    
      getAllCollections(): Promise<Collection[]> {
        return this.collectionRepository.find();
      }
    
      async findCollectionsByUserId(userId: number): Promise<Collection[]> {
        let collections = await this.collectionRepository.find({ 
          relations: { 
            user: true, 
          }, 
          where: {
            user : { 
              id: userId,
            }
          }
        })
        return collections;
      }
    
      async createCollection(name: string, userId: number): Promise<Collection> {
        const collection = new Collection(name);
        const user = await this.userService.getUserById(userId);
        collection.user = user;
        await collection.save();
        return collection;
      }

      async getCollectionById(id: number): Promise<Collection> {
        return await this.collectionRepository.findOne({ where: { id } });
      }
    
      async addCardsToCollection(collectionId: number, cardIds: number[]) {
        let collection = await this.getCollectionById(collectionId);
        
        let cards: Card[] = [];
        for(let i = 0; i < cardIds.length; i++) {
            let card = await this.cardService.findCardById(cardIds[i]);
            cards.push(card);
        }
        collection.cards = cards;
        collection.save();
        return collection;
      }
}
