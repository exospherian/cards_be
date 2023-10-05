import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { Collection } from './entities';
import { ApiQuery } from '@nestjs/swagger';


@Controller('collection')
export class CollectionController {
    constructor(private readonly collectionService: CollectionService) {}
  @Get('/getAllCollections')
  getAllCollections(): Promise<Collection[]> {
    return this.collectionService.getAllCollections();
  }

  @Post('/createCollection')
  addCollection(
    @Param('id') id: number, 
    @Query() name: string,
    ) {
    return this.collectionService.createCollection(name, id);
  }

  @Get('/findCollectionsByUserId')
  findCollectionsByUserId(@Param('id') id: number) {
      return this.collectionService.findCollectionsByUserId(id);
  }

  @ApiQuery({})
  @Post('/addCardsToCollection')
  async addCardsToCollection(
    @Param('id') id: number, 
    @Query() cardIds: number[]
    ): Promise<Collection> {
      console.log(cardIds, typeof cardIds);
    return await this.collectionService.addCardsToCollection(id, cardIds);
  }
}
