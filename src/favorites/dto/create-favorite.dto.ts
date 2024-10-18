import { IsString, IsNumber } from "class-validator";
import { IsNotEmpty } from "class-validator";

export class CreateFavoriteDto {
    @IsString()
    @IsNotEmpty()
    cityName: string;

    @IsString()
    @IsNotEmpty()
    country: string;
}
