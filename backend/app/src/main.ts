import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ブラウザのローカルホストからのアクセスを許可する
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    methods: process.env.CORS_METHODS,
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS,
  });
  await app.listen(process.env.PORT || 8000);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
