import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResasModule } from './resas/resas.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // アプリケーション全体でConfigModuleを利用可能にする
    }),
    ResasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
