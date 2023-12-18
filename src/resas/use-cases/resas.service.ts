import { Injectable } from '@nestjs/common';
import { CreateResaDto } from '../dto/create-resa.dto';
import { UpdateResaDto } from '../dto/update-resa.dto';

@Injectable()
export class ResasService {
  create(createResaDto: CreateResaDto) {
    return 'This action adds a new resa';
  }

  findAll() {
    return `This action returns all resas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resa`;
  }

  update(id: number, updateResaDto: UpdateResaDto) {
    return `This action updates a #${id} resa`;
  }

  remove(id: number) {
    return `This action removes a #${id} resa`;
  }
}
