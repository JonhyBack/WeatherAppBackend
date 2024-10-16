import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
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
      ...createFavoriteDto,
      user: { id: userId },
    });
    return this.favoritesRepository.save(favorite);
  }

  async findAllByUserId(userId: number): Promise<Favorite[]> {
    return this.favoritesRepository.findBy({ user: { id: userId } });
  }

  async update(updateFavoriteDto: UpdateFavoriteDto): Promise<string> {
    const favorite = await this.favoritesRepository.findOneBy({ id: updateFavoriteDto.id });
    if (!favorite) {
      throw new NotFoundException(`Favorite with ID ${updateFavoriteDto.id} not found for user ${updateFavoriteDto.userId}`);
    }

    await this.favoritesRepository.update(updateFavoriteDto.id, updateFavoriteDto);

    return `Favorite item with ID ${updateFavoriteDto.id} updated successfully for user ${updateFavoriteDto.userId}`;
  }

  async remove(id: number): Promise<string> {
    const favorite = await this.favoritesRepository.findOneBy({ id });
    if (!favorite) {
      throw new NotFoundException(`Favorite with ID ${id} not found`);
    }

    await this.favoritesRepository.remove(favorite);

    return `Favorite item with ID ${id} removed successfully from user ${favorite.user.id}`;
  }
}
