import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UserDto {
    @ApiProperty({
        description: 'The username of the user',
        example: 'johnDoe',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'mySecretPassword',
        minLength: 6
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}


