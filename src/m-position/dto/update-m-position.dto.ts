import { PartialType } from '@nestjs/mapped-types';
import { CreateMPositionDto } from './create-m-position.dto';

export class UpdateMPositionDto extends PartialType(CreateMPositionDto) {}
