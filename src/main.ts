import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // エンドポイントにapi/v1を付与
  app.setGlobalPrefix('api/v1');
}
bootstrap();
