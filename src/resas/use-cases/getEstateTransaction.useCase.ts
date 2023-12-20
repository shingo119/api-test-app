import { Inject, Injectable } from '@nestjs/common';
import { EstateQueryDto } from '../dto/estate-query.dto';
import { ResasRepository } from '../repository/resas.repository';
import { RESAS_REPOSITORY_TOKEN } from '../../constants';
import { HttpException } from '@nestjs/common';
import { City } from '../../../types/city-codes.response';

@Injectable()
export class GetEstateTransactionUseCase {
  constructor(
    @Inject(RESAS_REPOSITORY_TOKEN)
    private readonly resasRepository: ResasRepository,
  ) {}
  async getEstateTransaction(query: EstateQueryDto) {
    try {
      const cityCodesResponse = await this.resasRepository.getCityCodes(
        query.prefCode,
      );
      console.log(cityCodesResponse);
      // 都道府県コードが存在しない場合はエラーを返す
      if (
        query.cityCode !== '-' &&
        !cityCodesResponse.some(
          (item: City) => item.cityCode === query.cityCode,
        )
      ) {
        throw new HttpException('cityCode is invalid', 400);
      }
      const estateTransaction = await this.resasRepository.getEstateTransaction(
        query.year,
        query.prefCode,
        query.cityCode,
        query.displayType,
      );
      return estateTransaction;
    } catch (e) {
      // 都道府県コードが存在しない場合はエラーを返す
      if (e instanceof HttpException) throw e;
      // それ以外は500エラーを返す
      throw new HttpException('Internal Server Error', 500);
      // throw e;
    }
  }
}
