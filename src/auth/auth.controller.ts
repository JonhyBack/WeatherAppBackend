import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: AuthDto) {
        const user = await this.authService.validateUser(loginDto.username, loginDto.password);

        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        return this.authService.login(user);
    }

    @Post('signup')
    async signUp(@Body() signUpDto: AuthDto) {
        const newUser = await this.authService.signUp(signUpDto.username, signUpDto.password);

        if (!newUser) {
            throw new BadRequestException('Invalid credentials');
        }

        return this.authService.login(newUser);
    }
}
