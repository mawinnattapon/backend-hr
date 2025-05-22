import { Injectable } from '@nestjs/common';
import { CreateMPositionDto } from './dto/create-m-position.dto';
import { UpdateMPositionDto } from './dto/update-m-position.dto';
import { MPosition } from './entities/m-position.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MPositionService {
    constructor(
        @InjectRepository(MPosition)
        private readonly mPositionRepository: Repository<MPosition>,
    ) {}

    async create(createMPositionDto: CreateMPositionDto) {
        const mPosition = this.mPositionRepository.create(createMPositionDto);
        return this.mPositionRepository.save(mPosition);
    }

    async findAll() {
        return this.mPositionRepository.find();
    }

    findOne(id: number) {
        return this.mPositionRepository.findOne({ where: { posId: id } });
    }

    update(id: number, updateMPositionDto: UpdateMPositionDto) {
        return this.mPositionRepository.update(id, updateMPositionDto);
    }

    remove(id: number) {
        return this.mPositionRepository.delete(id);
  }
}
