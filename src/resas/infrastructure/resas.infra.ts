import { HttpException, Injectable } from '@nestjs/common';
import { ResasRepository } from '../repository/resas.repository';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { EstateTransactionResponse } from '../../../types/estate-transaction.response';
import { City } from '../../../types/city-codes.response';

@Injectable()
export class ResasInfrastracture implements ResasRepository {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async findAll(
    year: number,
    prefCode: number,
    cityCode: string | number,
    displayType: number,
  ): Promise<EstateTransactionResponse> {
    try {
      // api用のURL
      const url = `https://opendata.resas-portal.go.jp/api/v1/townPlanning/estateTransaction/bar?year=${year}&prefCode=${prefCode}&cityCode=${cityCode}&displayType=${displayType}`;
      // 都道府県コードのチェック用のURL
      const cityCheckUrl = `https://opendata.resas-portal.go.jp/api/v1/cities?prefCode=${prefCode}`;
      const apiKey = this.configService.get<string>('RESAS_API_KEY');
  
      // 都道府県コード一覧を取得
      const cityCheckResponse = await firstValueFrom(
        this.httpService
          .get(cityCheckUrl, {
            headers: { 'X-API-KEY': apiKey },
          })
          .pipe(map((res) => res.data)),
      );
  
      // 都道府県コードが存在しない場合はエラーを返す
      if (cityCode !== '-' && !cityCheckResponse.result.some((item: City) => item.cityCode === cityCode)) {
        throw new HttpException('cityCode is invalid', 400);
      }

      // 不動産取引価格を取得
      const response = this.httpService
        .get(url, {
          headers: { 'X-API-KEY': apiKey },
        })
        .pipe(map((res) => res.data));
  
      return await firstValueFrom(response);
    } catch (e) {
      // 都道府県コードが存在しない場合はエラーを返す
      if (e instanceof HttpException) throw e;
      // それ以外は500エラーを返す
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
