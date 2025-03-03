import { PartialType } from '@nestjs/swagger';
import { CreateAdoptionDto } from './create-adoption.dto';

export class UpdateAdoptionDto extends PartialType(CreateAdoptionDto) {}
