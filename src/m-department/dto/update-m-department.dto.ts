import { PartialType } from '@nestjs/mapped-types';
import { CreateMDepartmentDto } from './create-m-department.dto';

export class UpdateMDepartmentDto extends PartialType(CreateMDepartmentDto) {}
