import { Injectable } from '@nestjs/common';
import { EstateQueryDto } from '../dto/estate-query.dto';
import { ResasRepository } from '../repository/resas.repository';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';

@Injectable()
export class ResasInfrastracture implements ResasRepository {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async findAll(estateQueryDto: EstateQueryDto): Promise<any> {
    const url = `https://opendata.resas-portal.go.jp/api/v1/cities?prefCode=${prefCode}`;
    const apiKey = this.configService.get<string>('RESAS_API_KEY');

    return this.httpService
      .get(url, {
        headers: { 'X-API-KEY': apiKey },
      })
      .pipe(map((response) => response.data))
      .toPromise();
  }
}
