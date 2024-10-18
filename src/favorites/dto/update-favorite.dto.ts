import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from './create-favorite.dto';
import { IsNumber, IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
