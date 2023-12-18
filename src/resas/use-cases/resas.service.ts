import { Inject, Injectable } from '@nestjs/common';
import { EstateQueryDto } from '../dto/estate-query.dto';
import { ResasRepository } from '../repository/resas.repository';
import { RESAS_REPOSITORY_TOKEN } from '../../constants';

@Injectable()
export class ResasService {
  constructor(
    @Inject(RESAS_REPOSITORY_TOKEN)
    private readonly resasRepository: ResasRepository,
  ) {}
  findAll(query: EstateQueryDto) {
    return this.resasRepository.findAll(
      query.year,
      query.prefCode,
      query.cityCode,
      query.displayType,
    );
  }
}
