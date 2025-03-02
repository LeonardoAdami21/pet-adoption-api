import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AprovePetDto } from './dto/aprove-pet.dto';

@Controller('pets')
@ApiTags('Pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @ApiOperation({ summary: 'Get all pets' })
  @ApiOkResponse({ description: 'The record has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiQuery({ name: 'status', required: false })
  @Get('')
  getAllPets(@Query('status') status?: string) {
    return this.petService.getAllPets(status);
  }

  @ApiOperation({ summary: 'Create a pet' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  createPet(@Body() dto: CreatePetDto) {
    return this.petService.createPet(dto);
  }

  @ApiOperation({ summary: 'Approve a pet' })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiParam({ name: 'id', required: true })
  @Put('/:id/approve')
  approvePet(@Param('id') id: string, @Body() dto: AprovePetDto) {
    return this.petService.aprovedPet(id, dto);
  }

  @ApiOperation({ summary: 'Delete all pets' })
  @ApiOkResponse({ description: 'The record has been successfully deleted' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Delete('/:id')
  deleteAllPets(@Param('id') id: string) {
    return this.petService.deleteAllPets(id);
  }
}
