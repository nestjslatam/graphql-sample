import { BadRequestException, Logger, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Context,
  ResolveReference,
} from '@nestjs/graphql';
import { validate } from 'class-validator';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CreateUserInput,
  ResetPasswordInput,
  UpdateUserInput,
} from '../graphql.classes';
import { UsernameEmailAdminGuard } from '../auth/guards/username-email-admin.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { AdminAllowedArgs } from '../common/decorators/admin-allowed-args';
import { UserSignup } from './dto/users.dto';
import { User } from './schemas/users.schema';
import { UserInputError, ValidationError } from '@nestjs/apollo';

@Resolver('User')
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);

  constructor(private usersService: UsersService) {}

  @Query('users')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async users(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  // A NotFoundException is intentionally not sent so bots can't search for emails
  @Query('forgotPassword')
  async forgotPassword(@Args('email') email: string): Promise<boolean> {
    return await this.usersService.forgotPassword(email);
  }

  // What went wrong is intentionally not sent (wrong username or code or user not in reset status)
  @Mutation('resetPassword')
  async resetPassword(
    @Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput,
  ): Promise<User> {
    const { username, code, password } = resetPasswordInput;

    const user = await this.usersService.resetPassword(
      username,
      code,
      password,
    );

    if (!user) throw new UserInputError('The password was not reset');

    return user;
  }

  @Mutation('createUser')
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    try {
      this.guard(createUserInput);

      return await this.usersService.create(createUserInput);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Mutation('updateUser')
  @AdminAllowedArgs(
    'username',
    'fieldsToUpdate.username',
    'fieldsToUpdate.email',
    'fieldsToUpdate.enabled',
  )
  @UseGuards(JwtAuthGuard, UsernameEmailAdminGuard)
  async updateUser(
    @Args('username') username: string,
    @Args('fieldsToUpdate') fieldsToUpdate: UpdateUserInput,
    @Context('req') request: any,
  ): Promise<User> {
    let user: User | undefined;

    if (!username && request.user) username = request.user.username;

    try {
      user = await this.usersService.update(username, fieldsToUpdate);
    } catch (error) {
      throw new ValidationError(error.message);
    }

    if (!user) throw new UserInputError('The user does not exist');

    return user;
  }

  @Mutation('addAdminPermission')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async addAdminPermission(@Args('username') username: string): Promise<User> {
    const user = await this.usersService.addPermission('admin', username);

    if (!user) throw new UserInputError('The user does not exist');

    return user;
  }

  @Mutation('removeAdminPermission')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async removeAdminPermission(
    @Args('username') username: string,
  ): Promise<User> {
    const user = await this.usersService.removePermission('admin', username);

    if (!user) throw new UserInputError('The user does not exist');

    return user;
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    this.logger.log('ResolveReference :: user');

    return await this.usersService.findOneByUserId(reference.id);
  }

  @Query('user')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async user(@Args('id') id: string) {
    return await this.usersService.findOneByUserId(id);
  }

  private async guard(createUserInput: CreateUserInput): Promise<void> {
    const { email, username, password } = createUserInput;

    const userSignup = new UserSignup();
    userSignup.email = email;
    userSignup.username = username;
    userSignup.password = password;

    const errors = await validate(userSignup);

    if (errors.length > 0) {
      const errorsResponse: any = errors.map((val: any) => {
        return Object.values(val.constraints)[0] as string;
      });
      throw new BadRequestException(errorsResponse.join(','));
    }
  }
}
