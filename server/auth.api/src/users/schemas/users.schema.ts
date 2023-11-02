import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  public email!: string;

  @Prop()
  public password!: string;

  @Prop()
  public username!: string;

  @Prop({ type: [String], default: [] })
  public permissions!: string[];

  @Prop()
  public lowercaseUsername!: string;

  @Prop()
  public lowercaseEmail!: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  public passwordReset!: any;

  @Prop({ type: mongoose.Schema.Types.Date, default: Date.now })
  public created_at!: Date;

  @Prop({ type: mongoose.Schema.Types.Date, default: Date.now })
  public updated_at!: Date;
}

export const UsersSchema = SchemaFactory.createForClass(User);
