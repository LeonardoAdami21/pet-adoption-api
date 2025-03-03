import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAdoptionDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'G4A8o@example.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '123456789',
    required: true,
  })
  @IsNotEmpty()
  phoneNo: string;

  @ApiProperty({
    description: 'The living situation of the user',
    example: 'Apartment',
    required: true,
  })
  @IsNotEmpty()
  livingSituation: string;

  @ApiProperty({
    description: 'The previous experience of the user',
    example: 'I had a dog',
    required: true,
  })
  previousExperience: string;

  @ApiProperty({
    description: 'The previous situation of the user',
    example: 'I had a dog',
    required: true,
  })
  @IsNotEmpty()
  previusSituation: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  familyComposition: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  petId: string;
}
