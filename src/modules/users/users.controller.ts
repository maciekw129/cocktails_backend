import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetCurrentUser } from '../../shared/decorators/get-current-user.decorator';
import { UserDto } from './dto/userDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  getUser(@GetCurrentUser('sub') userId: string): Promise<UserDto> {
    return this.usersService.findUserById(userId);
  }
}
