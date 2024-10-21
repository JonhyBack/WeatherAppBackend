import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetFavoriteDto } from './dto/get-favorite.dto';

interface IRequest extends Request {
  user: any;
}

@ApiTags('favorites')
@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  @Post('add')
  @ApiOkResponse()
  @ApiBearerAuth()
  @ApiBadRequestResponse({ description: 'City already added' })
  @ApiBadRequestResponse({ description: 'You have already added 5 favorite cities' })
  async create(
    @Body() createFavoriteDto: CreateFavoriteDto,
    @Req() req: IRequest,
  ) {
    const favorites = await this.favoritesService.findAllByUserId(req.user.userId);

    if (favorites.some(favorite => favorite.city_name === createFavoriteDto.city
      && favorite.country === createFavoriteDto.country)) {
      throw new BadRequestException('You have already added this city');
    }

    if (favorites.length >= 5) {
      throw new BadRequestException('You have already added 5 favorite cities');
    }
    this.favoritesService.create(createFavoriteDto, req.user.userId)

    return 'Successfully added favorite city';
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse()
  getFavorites(@Req() req: IRequest,) {
    return this.favoritesService.findAllByUserId(req.user.userId).
      then(favorites => favorites.
        map<GetFavoriteDto>(
          favorite => ({
            id: favorite.id, city: favorite.city_name, country: favorite.country
          })));
  }

  // @Patch()
  // @ApiOkResponse()
  // update(@Body() updateFavoriteDto: UpdateFavoriteDto, @Req() req: IRequest) {
  //   return this.favoritesService.update(updateFavoriteDto, req.user.userId);
  // }

  @Delete('delete/:id')
  @ApiOkResponse()
  @ApiBearerAuth()
  @ApiBadRequestResponse({ description: 'City not found' })
  async remove(@Param('id') id: string, @Req() req: IRequest) {
    // try {
    const removedId = await this.favoritesService.remove(+id, req.user.userId);

    if (!removedId) {
      throw new NotFoundException('City not found')
    }

    return `Favorite item with ID ${removedId} removed successfully`
    // } catch (error) {
    //   if (error instanceof NotFoundException) {
    //     throw error;
    //   }
    //   throw error;
    // }
  }
}
