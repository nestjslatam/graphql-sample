import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';

import { UsersService } from './users.service';
import { UserResolver } from './users.resolvers';
import { DateScalar } from '../common/scalars/date.scalar';
import { AuthModule } from '../auth/auth.module';

import { User, UsersSchema } from './schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
  providers: [UsersService, UserResolver, DateScalar],
})
export class UsersModule {}
