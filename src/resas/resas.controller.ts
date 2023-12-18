import { Controller, Get, Query } from '@nestjs/common';
import { ResasService } from './use-cases/resas.service';
import { EstateQueryDto } from './dto/estate-query.dto';
import { EstateTransactionResponse } from '../../types/estate-transaction.response';

@Controller('townPlanning/estateTransaction/bar')
export class ResasController {
  constructor(private readonly resasService: ResasService) {}

  // クエリパラメータを受け取り、UseCaseディレクトリ内のサービスを呼び出す
  @Get()
  async findAll(
    @Query() query: EstateQueryDto,
  ): Promise<EstateTransactionResponse> {
    return await this.resasService.findAll(query);
  }
}
