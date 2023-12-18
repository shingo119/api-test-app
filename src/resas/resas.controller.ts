import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResasService } from './use-cases/resas.service';
import { CreateResaDto } from './dto/create-resa.dto';
import { UpdateResaDto } from './dto/update-resa.dto';

@Controller('resas')
export class ResasController {
  constructor(private readonly resasService: ResasService) {}

  @Post()
  create(@Body() createResaDto: CreateResaDto) {
    return this.resasService.create(createResaDto);
  }

  @Get()
  findAll() {
    return this.resasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResaDto: UpdateResaDto) {
    return this.resasService.update(+id, updateResaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resasService.remove(+id);
  }
}
