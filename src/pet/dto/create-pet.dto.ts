import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreatePetDto {
  @ApiProperty({
    description: 'The name of a pet',
    required: true,
    type: String,
    example: 'Kitty',
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    description: 'The age of a pet',
    required: true,
    type: Number,
    example: 3,
  })
  age: number;

  @ApiProperty({
    description: 'The area of a pet',
    required: true,
    type: String,
    example: 'Recife',
  })
  area: string;

  @ApiProperty({
    description: 'The justification of a pet',
    required: true,
    type: String,
    example: 'I want to adopt a pet',
  })
  justification: string;

  @ApiProperty({
    description: 'The email of a pet',
    required: true,
    type: String,
    example: 'bTm9B@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The phone of a pet',
    required: true,
    type: String,
    example: '81999999999',
  })
  phone: string;

  @ApiProperty({
    description: 'The type of a pet',
    required: true,
    type: String,
    example: 'Cat',
  })
  type: string;

  @ApiProperty({
    description: 'The filename of a pet',
    required: true,
    type: String,
    example: 'cat.jpg',
  })
  filename: string;
}
