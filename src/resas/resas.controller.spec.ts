import { Test, TestingModule } from '@nestjs/testing';
import { ResasController } from './resas.controller';
import { ResasService } from './use-cases/resas.service';
import { EstateTransactionResponse } from '../../types/estate-transaction.response';
import { HttpException } from '@nestjs/common';

describe('ResasController', () => {
  let controller: ResasController;
  let service: ResasService;

  beforeEach(async () => {
    // モックサービスの作成
    const mockService = {
      findAll: jest.fn().mockResolvedValue({
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
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResasController],
      providers: [
        {
          provide: ResasService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ResasController>(ResasController);
    service = module.get<ResasService>(ResasService);
  });

  it('正常系', async () => {
    const query = {
      year: 2015,
      prefCode: 13,
      cityCode: '13101',
      displayType: 1,
    };
    const result = {
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
    const response = await controller.findAll(query);
    expect(response).toEqual(result);
  });

  it('異常系 - サービス層からのエラー', async () => {
    jest.spyOn(service, 'findAll').mockImplementation(() => {
      throw new HttpException('Some error', 404);
    });
    const query = {
      year: 2015,
      prefCode: 13,
      cityCode: '13101',
      displayType: 1,
    };
    await expect(controller.findAll(query)).rejects.toThrow(HttpException);
  });
});
