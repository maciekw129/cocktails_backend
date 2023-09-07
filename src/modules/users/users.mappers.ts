import { User } from './user.entity';
import { UserDto } from './dto/userDto';

export class UsersMappers {
  static userToUserDto(user: User): UserDto {
    const { id, login, email, firstName, lastName } = user;
    return {
      id,
      login,
      email,
      firstName,
      lastName,
    };
  }
}
