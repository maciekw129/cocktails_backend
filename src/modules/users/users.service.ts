import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UsersMappers } from './users.mappers';
import { UserDto } from './dto/userDto';
import { PatchUserDto } from './dto/patchUserDto';

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

  async updateUser(userId: number, { firstName, lastName }: PatchUserDto) {
    await this.usersRepository
      .createQueryBuilder()
      .update()
      .set({ firstName, lastName })
      .where('id = :id', { id: userId })
      .execute();

    return this.findUserById(userId);
  }
}
