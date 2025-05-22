import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MPositionService } from './m-position.service';
import { CreateMPositionDto } from './dto/create-m-position.dto';
import { UpdateMPositionDto } from './dto/update-m-position.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('m-position')
export class MPositionController {
  constructor(private readonly mPositionService: MPositionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMPositionDto: CreateMPositionDto) {
    return this.mPositionService.create(createMPositionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.mPositionService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mPositionService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMPositionDto: UpdateMPositionDto) {
    return this.mPositionService.update(+id, updateMPositionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mPositionService.remove(+id);
  }
}
