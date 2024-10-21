import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(userDto: UserDto): Promise<User> {
    const user = this.usersRepository.create({ username: userDto.username, password_hash: userDto.password });
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async remove(username: string): Promise<DeleteResult> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      return null;
    }

    return await this.usersRepository.delete({ id: user.id });
  }
}
