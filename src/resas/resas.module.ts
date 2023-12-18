import { Module } from '@nestjs/common';
import { ResasService } from './use-cases/resas.service';
import { ResasController } from './resas.controller';
import { ResasInfrastracture } from './infrastructure/resas.infra';
import { ConfigModule } from '@nestjs/config';
import { RESAS_REPOSITORY_TOKEN } from '../constants';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // アプリケーション全体でConfigModuleを利用可能にする
    }),
    HttpModule,
  ],
  controllers: [ResasController],
  providers: [
    ResasService,
    { provide: RESAS_REPOSITORY_TOKEN, useClass: ResasInfrastracture },
  ],
})
export class ResasModule {}
