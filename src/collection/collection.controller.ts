import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { Collection } from './entities';


@Controller('collection')
export class CollectionController {

    constructor(private readonly collectionService: CollectionService) {}

    @Get('')
    getAllCollections(): Promise<Collection[]> {
      return this.collectionService.getAllCollections();
    }

    //doesn't work. adds every collection to user with id 1
    @Post('')
    addCollection(
      @Param('id') id: string, 
      @Query('name') name: string,
      ) {
      return this.collectionService.createCollection(name, id);
    }

    //not sure if works, watch addCollection path
    @Get(':id')
    findCollectionsByUserId(@Param('id') id: string) {
        return this.collectionService.findCollectionsByUserId(id);
    }

    // cards are received in a json format? non-array: {"value1", 'value2"}
    @Post('/add_cards')
    async addCardsToCollection(
      @Param('id') id: string, 
      @Query('cardIds') cardIds: string[]
      ): Promise<Collection> {
      return await this.collectionService.addCardsToCollection(id, cardIds);
    }
}
