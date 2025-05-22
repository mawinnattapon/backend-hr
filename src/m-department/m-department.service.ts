import { Injectable } from '@nestjs/common';
import { CreateMDepartmentDto } from './dto/create-m-department.dto';
import { UpdateMDepartmentDto } from './dto/update-m-department.dto';
import { MDepartment } from './entities/m-department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MDepartmentService {
  constructor(
    @InjectRepository(MDepartment)
    private readonly mDepartmentRepository: Repository<MDepartment>,
  ) {}

  create(createMDepartmentDto: CreateMDepartmentDto) {
    const mDepartment = this.mDepartmentRepository.create(createMDepartmentDto);
    return this.mDepartmentRepository.save(mDepartment);
  }

  findAll() {
    return this.mDepartmentRepository.find();
  }

  findOne(id: number) {
    return this.mDepartmentRepository.findOne({ where: { depId: id } });
  }

  update(id: number, updateMDepartmentDto: UpdateMDepartmentDto) {
    return this.mDepartmentRepository.update(id, updateMDepartmentDto);
  }

  remove(id: number) {
    return this.mDepartmentRepository.delete(id);
  }
}
