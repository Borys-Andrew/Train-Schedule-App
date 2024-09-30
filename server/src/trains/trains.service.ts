import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Train } from './entities/train.entity';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';

@Injectable()
export class TrainsService {
  constructor(
    @InjectRepository(Train)
    private readonly trainRepo: Repository<Train>,
  ) {}
  async create(createTrainDto: CreateTrainDto): Promise<Train> {
    const { number, route, track, arrival, departure } = createTrainDto;

    return await this.trainRepo.save({
      number,
      route,
      track,
      arrival,
      departure,
    });
  }

  async findAll(): Promise<Train[]> {
    return await this.trainRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }
  async findOne(id: string): Promise<Train> {
    const train = await this.trainRepo.findOne({ where: { id } });

    if (!train) {
      throw new NotFoundException(`Train with ID ${id} not found`);
    }

    return train;
  }

  async update(id: string, updateTrainDto: UpdateTrainDto): Promise<Train> {
    const train = await this.findOne(id);

    if (!train) {
      throw new NotFoundException(`Train with ID ${id} not found`);
    }

    Object.assign(train, updateTrainDto);
    return await this.trainRepo.save(train);
  }

  async remove(id: string): Promise<void> {
    const train = await this.findOne(id);

    if (!train) {
      throw new NotFoundException(`Train with ID ${id} not found`);
    }

    await this.trainRepo.remove(train);
  }
}
