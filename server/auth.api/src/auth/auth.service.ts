import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserInput, LoginResult } from '../graphql.classes';
import { User } from 'src/users/schemas/users.schema';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserByPassword(
    loginAttempt: LoginUserInput,
  ): Promise<LoginResult | undefined> {
    let userToAttempt: User | undefined | null;

    if (loginAttempt.email) {
      userToAttempt = await this.usersService.findOneByEmail(
        loginAttempt.email,
      );
    }

    let isMatch = false;

    try {
      isMatch = await this.comparePassword(
        loginAttempt.password,
        userToAttempt.password,
      );
    } catch (error) {
      console.log(error);
      return undefined;
    }

    if (isMatch) {
      const token = this.createJwt(userToAttempt).token;
      const result: any = {
        user: userToAttempt,
        token,
      };

      userToAttempt.updated_at = new Date();

      await this.usersService.updateAttempt(userToAttempt);

      return result;
    }
    return null;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  async validateJwtPayload(payload: JwtPayload): Promise<User | undefined> {
    const user = await this.usersService.findOneByUsername(payload.username);

    if (user) {
      user.updated_at = new Date();
      this.usersService.updateAttempt(user);
      return user;
    }

    return undefined;
  }

  createJwt(user: User): { data: JwtPayload; token: string } {
    const expiresIn = parseInt(process.env.JWT_EXPIRE_IN);

    let expiration: Date | undefined;
    if (expiresIn) {
      expiration = new Date();
      expiration.setTime(expiration.getTime() + expiresIn * 1000);
    }

    const data: JwtPayload = {
      username: user.username,
      permissions: user.permissions,
      expiration,
    };

    const jwt = this.jwtService.sign(data);

    return {
      data,
      token: jwt,
    };
  }
}
