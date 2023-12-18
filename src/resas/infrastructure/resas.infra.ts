import { Injectable } from '@nestjs/common';
import { ResasRepository } from '../repository/resas.repository';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { EstateTransactionResponse } from '../../../types/estate-transaction.response';

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
    const url = `https://opendata.resas-portal.go.jp/api/v1/townPlanning/estateTransaction/bar?year=${year}&prefCode=${prefCode}&cityCode=${cityCode}&displayType=${displayType}`;
    const apiKey = this.configService.get<string>('RESAS_API_KEY');

    const response = this.httpService
      .get(url, {
        headers: { 'X-API-KEY': apiKey },
      })
      .pipe(map((res) => res.data));

    return firstValueFrom(response);
  }
}
