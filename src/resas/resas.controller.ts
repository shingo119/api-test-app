import { Controller, Get, Query } from '@nestjs/common';
import { ResasService } from './use-cases/resas.service';
import { EstateQueryDto } from './dto/estate-query.dto';

@Controller('townPlanning/estateTransaction/bar')
export class ResasController {
  constructor(private readonly resasService: ResasService) {}

  @Get()
  findAll(@Query() query: EstateQueryDto): string {
    return this.resasService.findAll(query);
  }
}
