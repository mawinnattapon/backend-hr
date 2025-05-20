import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ตั้งค่า CORS ให้อนุญาตทั้งหมด
  const corsOptions: CorsOptions = {
    origin: '*', // อนุญาตทุก origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Accept,Authorization',
    exposedHeaders: 'X-New-Access-Token', // เพิ่ม header ที่ต้องการให้ client เข้าถึงได้
  };
  
  app.enableCors(corsOptions);
  
  console.log('Server is running on port: ', process.env.PORT);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
