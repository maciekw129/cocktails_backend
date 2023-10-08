import { UserDto } from "../modules/users/dto/userDto";

export interface Token {
  access_token: string;
  refresh_token: string;
}

export interface JwtPayload {
  email: string;
  sub: number;
}

export interface AuthApi {
  tokens: Token;
  user: UserDto;
}
