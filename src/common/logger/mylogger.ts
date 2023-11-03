/* eslint-disable prettier/prettier */
import { ConsoleLogger } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    super.error.apply(this);
  }
}
