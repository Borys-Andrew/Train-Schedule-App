import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TrainsService } from './trains.service';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('trains')
export class TrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createTrainDto: CreateTrainDto) {
    return this.trainsService.create(createTrainDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.trainsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.trainsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateTrainDto: UpdateTrainDto) {
    return this.trainsService.update(id, updateTrainDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  replace(@Param('id') id: string, @Body() updateTrainDto: UpdateTrainDto) {
    return this.trainsService.update(id, updateTrainDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.trainsService.remove(id);
  }
}
