import { Injectable } from '@nestjs/common';
import { EstateQueryDto } from '../dto/estate-query.dto';
import { ResasRepository } from '../repository/resas.repository';

@Injectable()
export class ResasService {
  constructor(private readonly resasRepository: ResasRepository) {}
  findAll(query: EstateQueryDto) {
    return this.resasRepository.findAll(query);
  }
}