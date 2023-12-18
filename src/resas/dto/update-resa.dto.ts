import { PartialType } from '@nestjs/mapped-types';
import { CreateResaDto } from './create-resa.dto';

export class UpdateResaDto extends PartialType(CreateResaDto) {}
