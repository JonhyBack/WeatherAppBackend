import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Create a user' })
    @ApiBearerAuth()
    @ApiCreatedResponse()
    async create(@Body() createUserDto: UserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        description: 'List of users',
        type: [UserDto],
    })
    async findAll() {
        return this.usersService.findAll();
    }

    @Get(':username')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get a user by username' })
    @ApiResponse({
        status: 200,
        description: 'The user',
        type: UserDto,
    })
    async findOne(@Param('username') username: string) {
        return this.usersService.findOne(username);
    }

    @Delete(':username')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a user' })
    @ApiResponse({
        status: 200,
        description: 'The deleted user',
        type: UserDto,
    })
    async remove(@Param('username') username: string) {
        return this.usersService.remove(username);
    }
}


