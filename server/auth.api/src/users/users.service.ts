import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AuthService } from '../auth/auth.service';
import { CreateUserInput, UpdateUserInput } from '../graphql.classes';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService,
  ) {}

  isAdmin(permissions: string[]): boolean {
    return permissions.includes('admin');
  }

  async addPermission(
    permission: string,
    username: string,
  ): Promise<User | undefined> {
    const user = await this.findOneByUsername(username);

    if (!user) return null;

    if (user.permissions.includes(permission)) return user;

    user.permissions.push(permission);

    await this.userModel.apply(user).save();

    return user;
  }

  async removePermission(
    permission: string,
    username: string,
  ): Promise<User | undefined> {
    const user = await this.findOneByUsername(username);

    if (!user) return undefined;

    user.permissions = user.permissions.filter(
      (userPermission) => userPermission !== permission,
    );

    await this.userModel.apply(user).save();

    return user;
  }

  async updateAttempt(user: User): Promise<void> {
    await this.userModel.updateOne(user);
  }

  async update(
    username: string,
    fieldsToUpdate: UpdateUserInput,
  ): Promise<User | undefined> {
    if (fieldsToUpdate.username) {
      const duplicateUser = await this.findOneByUsername(
        fieldsToUpdate.username,
      );

      if (duplicateUser) fieldsToUpdate.username = undefined;
    }

    if (fieldsToUpdate.email) {
      const duplicateUser = await this.findOneByEmail(fieldsToUpdate.email);

      if (duplicateUser) fieldsToUpdate.email = undefined;
    }

    const fields: any = {};

    if (fieldsToUpdate.password) {
      if (
        await this.authService.validateUserByPassword({
          username,
          password: fieldsToUpdate.password.oldPassword,
        })
      ) {
        fields.password = fieldsToUpdate.password.newPassword;
      }
    }

    // Remove undefined keys for update
    for (const key in fieldsToUpdate) {
      if (typeof fieldsToUpdate[key] !== 'undefined' && key !== 'password') {
        fields[key] = fieldsToUpdate[key];
      }
    }

    let user: User | undefined | null = null;

    if (Object.entries(fieldsToUpdate).length > 0) {
      user = await this.findOneByUsername(username.toLowerCase());
      if (fields.username) {
        fields.lowercaseUsername = fields.username.toLowerCase();
      }
      if (fields.email) {
        fields.lowercaseEmail = fields.email.toLowerCase();
      }
      const saveEntity = { ...user, ...fields };
      await this.userModel.apply(saveEntity).save();
    }

    user = await this.findOneByUsername(username);

    if (!user) return null;

    return user;
  }

  async forgotPassword(email: string): Promise<boolean> {
    const user = await this.findOneByEmail(email);
    if (!user) return false;

    const token = randomBytes(32).toString('hex');

    // One day for expiration of reset token
    const expiration = new Date(Date().valueOf() + 24 * 60 * 60 * 1000);

    // use send-grid and send email
    // ! TBD

    /* const mailOptions: SendMailOptions = {
       from: this.configService.emailFrom,
       to: email,
       subject: `Reset Password`,
       text: `${user.username},
       Replace this with a website that can pass the token:
       ${token}`,
     }; */

    return new Promise((resolve) => {
      /*transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          resolve(false);
          return;
        }
      }); */
      user.passwordReset = {
        token,
        expiration,
      };
      user.updated_at = new Date();

      this.userModel
        .apply(user)
        .save()
        .then(
          () => resolve(true),
          () => resolve(false),
        );
    });
  }

  async resetPassword(
    username: string,
    code: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.findOneByUsername(username);

    if (user && user.passwordReset) {
      if (user.passwordReset.token === code) {
        user.password = await this.hashPassword(password);
        user.passwordReset = null;

        await this.userModel.apply(user).save();

        return user;
      }
    }
    return null;
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const pass = await this.hashPassword(createUserInput.password);

    const saveEntity = {
      ...createUserInput,
      password: pass,
      lowercaseUsername: createUserInput.username.toLowerCase(),
      lowercaseEmail: createUserInput.email.toLowerCase(),
    };

    try {
      const user = await this.userModel.create(saveEntity);
      return user;
    } catch (error) {
      console.log(error);
      throw this.evaluateDBError(error, createUserInput);
    }
  }

  private async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  private async comparePassword(enteredPassword, dbPassword) {
    return await bcrypt.compare(enteredPassword, dbPassword);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: { lowercaseEmail: email.toLowerCase() },
    });

    if (user) return user;

    return null;
  }

  async findOneByUserId(id: any): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { id } });

    if (user) return user;

    return null;
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({
      where: { lowercaseUsername: username.toLowerCase() },
    });

    if (user) return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find({});
  }

  private evaluateDBError(
    error: Error,
    createUserInput: CreateUserInput,
  ): Error {
    throw new Error(
      `Username ${createUserInput.username} is already registered. Details: ${error}`,
    );
  }
}
