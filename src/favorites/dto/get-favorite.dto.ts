import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from './create-favorite.dto';
import { IsNumber } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class GetFavoriteDto extends PartialType(CreateFavoriteDto) {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
