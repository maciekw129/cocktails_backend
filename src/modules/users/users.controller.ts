import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetCurrentUser } from '../../shared/decorators/get-current-user.decorator';
import { UserDto } from './dto/userDto';
import { PatchUserDto } from './dto/patchUserDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  getUser(@GetCurrentUser('sub') userId: string): Promise<UserDto> {
    return this.usersService.findUserById(userId);
  }

  @Patch('')
  @HttpCode(HttpStatus.OK)
  updateUser(
    @GetCurrentUser('sub') userId: number,
    @Body() userData: PatchUserDto,
  ): Promise<UserDto> {
    return this.usersService.updateUser(userId, userData);
  }
}
