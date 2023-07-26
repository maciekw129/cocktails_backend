import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';
import { Token } from './auth.model';
import { LoginDto } from './dto/loginDto';
import { RtGuard } from './guards/rt.guard';
import { GetCurrentUser } from 'src/shared/decorators/get-current-user.decorator';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  registerLocal(@Body() registerDto: RegisterDto): Promise<Token> {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  loginLocal(@Body() loginDto: LoginDto): Promise<Token> {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUser('sub') userId: number) {
    this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUser('sub') userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Token> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
