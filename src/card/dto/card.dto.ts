import { ApiProperty } from '@nestjs/swagger';


export class CardDto {
    @ApiProperty()
    term: string;

    @ApiProperty()
    meaning: string;

    @ApiProperty()
    author?: string;
}

