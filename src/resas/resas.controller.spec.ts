import { Test, TestingModule } from '@nestjs/testing';
import { ResasController } from './resas.controller';
import { ResasService } from './use-cases/resas.service';

describe('ResasController', () => {
  let controller: ResasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResasController],
      providers: [ResasService],
    }).compile();

    controller = module.get<ResasController>(ResasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
