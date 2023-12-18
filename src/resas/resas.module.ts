import { Module } from '@nestjs/common';
import { ResasService } from './use-cases/resas.service';
import { ResasController } from './resas.controller';

@Module({
  controllers: [ResasController],
  providers: [ResasService],
})
export class ResasModule {}
