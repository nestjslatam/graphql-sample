export interface JwtPayload {
  username: string;
  permissions: string[];
  expiration?: Date;
}
