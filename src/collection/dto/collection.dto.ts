import { ApiProperty } from '@nestjs/swagger';


export class CollectionDto {
    @ApiProperty()
    name: string;

    //how to work with relations? 
    //user and cards connections
}