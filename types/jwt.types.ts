export type JwtPayload = {
  email: string;
  username: string;
  sub: string;
};

export type RefreshJwtPayload = JwtPayload & { refreshToken: string };

export type TokensType = {
  access_token: string;
  refresh_token: string;
};
