import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthResolver } from './auth.resolvers';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      useFactory: () => {
        const options: JwtModuleOptions = {
          secret: process.env.JWT_SECRET,
        };

        const expiresIn = parseInt(process.env.JWT_EXPIRES_IN);

        if (expiresIn) {
          options.signOptions = {
            expiresIn: expiresIn,
          };
        }
        return options;
      },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
