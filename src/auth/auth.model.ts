export interface Token {
  access_token: string;
  refresh_token: string;
}

export interface JwtPayload {
  email: string;
  sub: number;
}
