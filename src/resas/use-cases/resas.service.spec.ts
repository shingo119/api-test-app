import { Test, TestingModule } from '@nestjs/testing';
import { ResasService } from './resas.service';
import { EstateTransactionResponse } from '../../../types/estate-transaction.response';
import { HttpException } from '@nestjs/common';
// import { ResasRepository } from '../repository/resas.repository';

describe('ResasService', () => {
  let service: ResasService;
  let mockRepository: { findAll: jest.Mock };


  beforeEach(async () => {
    mockRepository = {
      findAll: jest.fn().mockResolvedValue({
        message: null,
        result: {
          prefCode: '13',
          prefName: '東京都',
          cityCode: '13101',
          cityName: '千代田区',
          displayType: '1',
          years: [{
            year: 2015,
            value: 2361873
          }]
        }
      })
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResasService,
        {
          provide: 'ResasRepositoryToken', // トークンに対してモックリポジトリを提供
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ResasService>(ResasService);
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
        years: [{
          year: 2015,
          value: 2361873
        }]
      }
    };

    mockRepository.findAll.mockResolvedValue(expectedResponse);

    const result = await service.findAll(query);
    expect(result).toEqual(expectedResponse);
    expect(mockRepository.findAll).toHaveBeenCalledWith(query.year, query.prefCode, query.cityCode, query.displayType);
  });

  it('異常系', async () => {
    const query = {
      year: 2015,
      prefCode: 13,
      cityCode: '13101',
      displayType: 1,
    };
    const error = new HttpException('Some error', 404);
  
    mockRepository.findAll.mockRejectedValue(error);
  
    await expect(service.findAll(query)).rejects.toThrow('Some error');
  });
});