import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { users } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { MPositionModule } from './m-position/m-position.module';
import { MPosition } from './m-position/entities/m-position.entity';
import { MDepartmentModule } from './m-department/m-department.module';
import { MDepartment } from './m-department/entities/m-department.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [users, MPosition, MDepartment],
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
      logging: process.env.DATABASE_LOGGING === 'true',
    }),
    UsersModule,
    AuthModule,
    MPositionModule,
    MDepartmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
