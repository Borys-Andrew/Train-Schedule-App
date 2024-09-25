import { Module } from '@nestjs/common';
import { TrainsService } from './trains.service';
import { TrainsController } from './trains.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Train } from './entities/train.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Train])],
  controllers: [TrainsController],
  providers: [TrainsService],
})
export class TrainsModule {}
