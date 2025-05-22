import { Module } from '@nestjs/common';
import { MPositionService } from './m-position.service';
import { MPositionController } from './m-position.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MPosition } from './entities/m-position.entity';

@Module({
  controllers: [MPositionController],
  providers: [MPositionService],
  imports: [TypeOrmModule.forFeature([MPosition])],
  exports: [MPositionService],
})
export class MPositionModule {
  constructor() {
    console.log('MPositionModule loaded');
  }
}
