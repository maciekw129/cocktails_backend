import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UsersMappers } from './users.mappers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUserById(userId) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    return UsersMappers.userToUserDto(user);
  }
}
