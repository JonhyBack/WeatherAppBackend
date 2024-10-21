import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";
import { IsNotEmpty } from "class-validator";

export class CreateFavoriteDto {
    @ApiProperty({
        description: "The city of the favorite",
        example: "New York",
    })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({
        description: "The country of the favorite",
        example: "USA",
    })
    @IsString()
    @IsNotEmpty()
    country: string;
}

