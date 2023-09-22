import { Controller, Post, Get, Body } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { Collection } from './entities';

@Controller('collection')
export class CollectionController {
    constructor(private readonly collectionService: CollectionService) {}
  @Get('/getAllCollections')
  getAllCollections(): Promise<Collection[]> {
    return this.collectionService.getAllCollections();
  }

  @Post('/createCollection')
  addCollection(
    @Body()
    { name, userId },
  ) {
    return this.collectionService.createCollection(name, userId);
  }

  @Get('/findCollectionsByUserId')
  findCollectionsByUserId(@Body() { userId }) {
      return this.collectionService.findCollectionsByUserId(userId);
  }

  @Post('/addCardsToCollection')
  addCardsToCollection(@Body() { collectionId, cardIds }) {
    return this.collectionService.addCardsToCollection(collectionId, cardIds);
  }
}
