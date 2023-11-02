import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.APP_PORT || 5001;

  await app.listen(port);

  console.log(`API Graphql Federation Gateway is running on port:${port}`);
}
bootstrap();
