import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from './create-favorite.dto';
import { IsNumber } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetFavoriteDto extends PartialType(CreateFavoriteDto) {
    @ApiProperty({
        description: "The id of the favorite",
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
