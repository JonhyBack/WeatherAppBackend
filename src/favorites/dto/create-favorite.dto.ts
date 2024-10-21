import { IsString, IsNumber } from "class-validator";
import { IsNotEmpty } from "class-validator";

export class CreateFavoriteDto {
    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    country: string;
}
