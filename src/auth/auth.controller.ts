import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login user' })
    @ApiBadRequestResponse({ description: 'Invalid credentials' })
    async login(@Body() loginDto: AuthDto) {
        const user = await this.authService.validateUser(loginDto.username, loginDto.password);

        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        return this.authService.login(user);
    }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Sign up new user' })
    @ApiCreatedResponse({ description: 'Favorite item created successfully' })
    @ApiBadRequestResponse({ description: 'Invalid credentials' })
    async signUp(@Body() signUpDto: AuthDto) {
        const newUser = await this.authService.signUp(signUpDto.username, signUpDto.password);

        if (!newUser) {
            throw new BadRequestException('Invalid credentials');
        }

        return `${newUser.username} created successfully`;
    }
}

