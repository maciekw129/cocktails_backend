import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/registerDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Token } from './auth.model';
import { LoginDto } from './dto/loginDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  public async register(registerDto: RegisterDto) {
    const hashedPassword = await this.hashValue(registerDto.password);

    const user = await this.usersRepository.findBy({
      email: registerDto.email,
    });
    if (user.length) throw new ForbiddenException('User already exists.');

    const newUser = this.usersRepository.create({
      ...registerDto,
      createdAt: new Date(),
      hashedRt: '',
      password: hashedPassword,
    });
    this.usersRepository.save(newUser);

    const tokens = await this.getTokens(newUser.id);
    await this.updateRtHash(newUser.id, newUser.hashedRt);

    return tokens;
  }

  public async login({ email, password }: LoginDto): Promise<Token> {
    const user = await this.usersRepository.findOneByOrFail({ email });

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) throw new ForbiddenException('Wrong credentials');

    const tokens = await this.getTokens(user.id);
    await this.updateRtHash(user.id, user.hashedRt);

    return tokens;
  }

  public async logout(userId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    user.hashedRt = null;

    this.usersRepository.save(user);
  }

  public async refreshTokens(userId: number, rt: string) {
    const user = await this.usersRepository.findOneBy({ id: userId });

    const rtMatches = bcrypt.compare(rt, user.hashedRt);
    if (!rtMatches) throw new ForbiddenException('access denied');

    const tokens = await this.getTokens(user.id);
    await this.updateRtHash(user.id, user.hashedRt);

    return tokens;
  }

  private hashValue(value: string) {
    return bcrypt.hash(value, 10);
  }

  private async getTokens(userId: number): Promise<Token> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: process.env.AT_SECRET,
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: process.env.RT_SECRET,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  private async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashValue(rt);
    const user = await this.usersRepository.findOneBy({ id: userId });

    user.hashedRt = hash;

    this.usersRepository.save(user);
  }
}
