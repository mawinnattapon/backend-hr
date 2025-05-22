import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MDepartmentService } from './m-department.service';
import { CreateMDepartmentDto } from './dto/create-m-department.dto';
import { UpdateMDepartmentDto } from './dto/update-m-department.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('m-department')
@UseGuards(JwtAuthGuard)
export class MDepartmentController {
  constructor(private readonly mDepartmentService: MDepartmentService) {}

  @Post()
  create(@Body() createMDepartmentDto: CreateMDepartmentDto) {
    return this.mDepartmentService.create(createMDepartmentDto);
  }

  @Get()
  findAll() {
    return this.mDepartmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mDepartmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMDepartmentDto: UpdateMDepartmentDto) {
    return this.mDepartmentService.update(+id, updateMDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mDepartmentService.remove(+id);
  }
}
