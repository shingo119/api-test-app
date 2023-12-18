import { Injectable } from '@nestjs/common';
import { EstateQueryDto } from '../dto/estate-query.dto';
import { ResasRepository } from '../repository/resas.repository';

@Injectable()
export class ResasInfrastracture implements ResasRepository {
  async findAll(params: EstateQueryDto): Promise<string> {
    // RESAS-APIとの通信を実装
    return 'Hello World!';
  }
}