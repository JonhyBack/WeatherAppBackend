import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class AuthDto {
    @ApiProperty({
        description: 'The username of the user',
        example: 'JohnDoe',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'MySecretPassword123!', minLength: 6, pattern: "/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/",
    })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/, {
        message:
            'Password too weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    })
    password: string;
}
