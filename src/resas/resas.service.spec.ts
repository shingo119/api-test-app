import { Test, TestingModule } from '@nestjs/testing';
import { ResasService } from './use-cases/resas.service';

describe('ResasService', () => {
  let service: ResasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResasService],
    }).compile();

    service = module.get<ResasService>(ResasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
