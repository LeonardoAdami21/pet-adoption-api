import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('adoption')
@ApiTags('Adoption')
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @ApiOperation({ summary: 'Create a new adoption form' })
  @ApiCreatedResponse({ description: 'Adoption form created successfully' })
  @ApiBadRequestResponse({ description: 'Missing required fields' })
  @ApiNotFoundResponse({ description: 'Pet does not exist' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  create(@Body() createAdoptionDto: CreateAdoptionDto) {
    return this.adoptionService.createAdoption(createAdoptionDto);
  }

  @ApiOperation({ summary: 'Find all adoption forms' })
  @ApiOkResponse({ description: 'Adoption forms found successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll() {
    return this.adoptionService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an adoption form' })
  @ApiOkResponse({ description: 'Adoption form deleted successfully' })
  @ApiNotFoundResponse({ description: 'Adoption form not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async delete(@Param('id') id: string) {
    return this.adoptionService.deleteForm(id);
  }

  @Delete(':id/all')
  @ApiOperation({ summary: 'Delete an adoption form' })
  @ApiOkResponse({ description: 'Adoption form deleted successfully' })
  @ApiNotFoundResponse({ description: 'Adoption form not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async deleteAll(@Param('id') id: string) {
    return this.adoptionService.deleteAllForms(id);
  }
}
