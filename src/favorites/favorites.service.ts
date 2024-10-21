import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
  ) { }

  async create(createFavoriteDto: CreateFavoriteDto, userId: number): Promise<Favorite> {
    const favorite = this.favoritesRepository.create({
      city_name: createFavoriteDto.city,
      country: createFavoriteDto.country,
      user: { id: userId },
    });
    return this.favoritesRepository.save(favorite);
  }

  async findAllByUserId(userId: number): Promise<Favorite[]> {
    return this.favoritesRepository.findBy({ user: { id: userId } });
  }

  async remove(id: number, userId: number): Promise<number> {
    const favorite = await this.favoritesRepository.findOneBy({ id, user: { id: userId } });
    if (!favorite) {
      return null;
    }

    await this.favoritesRepository.remove(favorite);

    return id;
  }
}
