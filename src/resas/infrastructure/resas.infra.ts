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

  async getEstateTransaction(
    year: number,
    prefCode: number,
    cityCode: string | number,
    displayType: number,
  ): Promise<EstateTransactionResponse> {
      // api用のURL
      const url = `https://opendata.resas-portal.go.jp/api/v1/townPlanning/estateTransaction/bar?year=${year}&prefCode=${prefCode}&cityCode=${cityCode}&displayType=${displayType}`;
      const apiKey = this.configService.get<string>('RESAS_API_KEY');
      // 不動産取引価格を取得
      const response = this.httpService
        .get(url, {
          headers: { 'X-API-KEY': apiKey },
        })
        .pipe(map((res) => res.data));
      return await firstValueFrom(response);
  }

  async getCityCodes(prefCode: number): Promise<City[]> {
    // 都道府県コードのチェック用のURL
    const cityCheckUrl = `https://opendata.resas-portal.go.jp/api/v1/cities?prefCode=${prefCode}`;
    // apiキーを取得
    const apiKey = this.configService.get<string>('RESAS_API_KEY');
    // 都道府県コード一覧を取得
    const cityCheckResponse = await firstValueFrom(
      this.httpService
        .get(cityCheckUrl, {
          headers: { 'X-API-KEY': apiKey },
        })
        .pipe(map((res) => res.data)),
    );
    return cityCheckResponse['result']
  }
}
