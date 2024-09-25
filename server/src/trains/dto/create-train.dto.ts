import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTrainDto {
  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  route: string;

  @IsNumber()
  @IsNotEmpty()
  track: number;

  @IsNotEmpty()
  arrival: string;

  @IsNotEmpty()
  departure: string;
}
