import { Module } from '@nestjs/common';
import { MDepartmentService } from './m-department.service';
import { MDepartmentController } from './m-department.controller';
import { MDepartment } from './entities/m-department.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [MDepartmentController],
  providers: [MDepartmentService],
  imports: [TypeOrmModule.forFeature([MDepartment])],
  exports: [MDepartmentService],
})
export class MDepartmentModule {}
