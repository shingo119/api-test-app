import { Test, TestingModule } from '@nestjs/testing';
import { GetEstateTransactionUseCase } from './getEstateTransaction.useCase';
import { EstateTransactionResponse } from '../../../types/estate-transaction.response';
import { HttpException } from '@nestjs/common';
// import { ResasRepository } from '../repository/resas.repository';

describe('GetEstateTransactionUseCase', () => {
  let service: GetEstateTransactionUseCase;
  let mockRepository: {
    getEstateTransaction: jest.Mock;
    getCityCodes: jest.Mock;
  };

  beforeEach(async () => {
    mockRepository = {
      getEstateTransaction: jest.fn().mockResolvedValue({
        message: null,
        result: {
          prefCode: '13',
          prefName: '東京都',
          cityCode: '13101',
          cityName: '千代田区',
          displayType: '1',
          years: [
            {
              year: 2015,
              value: 2361873,
            },
          ],
        },
      }),
      getCityCodes: jest.fn().mockResolvedValue([
        {
          prefCode: 13,
          cityCode: '13101',
          cityName: '千代田区',
          bigCityFlag: '3'
        },
        {
          prefCode: 13,
          cityCode: '13102',
          cityName: '中央区',
          bigCityFlag: '3'
        },
        { prefCode: 13, cityCode: '13103', cityName: '港区', bigCityFlag: '3' },
        {
          prefCode: 13,
          cityCode: '13104',
          cityName: '新宿区',
          bigCityFlag: '3'
        },
        {
          prefCode: 13,
          cityCode: '13105',
          cityName: '文京区',
          bigCityFlag: '3'
        },
      ]),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetEstateTransactionUseCase,
        {
          provide: 'ResasRepositoryToken', // トークンに対してモックリポジトリを提供
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GetEstateTransactionUseCase>(GetEstateTransactionUseCase);
  });

  it('正常系', async () => {
    const query = {
      year: 2015,
      prefCode: 13,
      cityCode: '13101',
      displayType: 1,
    };
    const expectedResponse: EstateTransactionResponse = {
      message: null,
      result: {
        prefCode: '13',
        prefName: '東京都',
        cityCode: '13101',
        cityName: '千代田区',
        displayType: '1',
        years: [
          {
            year: 2015,
            value: 2361873,
          },
        ],
      },
    };

    const result = await service.getEstateTransaction(query);
    expect(result).toEqual(expectedResponse);
    expect(mockRepository.getEstateTransaction).toHaveBeenCalledWith(
      query.year,
      query.prefCode,
      query.cityCode,
      query.displayType,
    );
  });

  it('異常系', async () => {
    const query = {
      year: 2015,
      prefCode: 13,
      cityCode: '13101',
      displayType: 1,
    };
    

    mockRepository.getCityCodes.mockResolvedValueOnce([]);

    await expect(service.getEstateTransaction(query)).rejects.toThrow(
      'cityCode is invalid',
    );
  });
});
