import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResasModule } from './resas/resas.module';

@Module({
  imports: [ResasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
