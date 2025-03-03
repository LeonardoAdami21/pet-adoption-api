import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AprovePetDto } from './dto/aprove-pet.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';

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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Kitty',
        },
        age: {
          type: 'number',
          example: 3,
        },
        area: {
          type: 'string',
          example: 'Recife',
        },
        justification: {
          type: 'string',
          example: 'I want to adopt a pet',
        },
        email: {
          type: 'string',
          example: 'G7O4o@example.com',
        },
        phone: {
          type: 'string',
          example: '81999999999',
        },
        filename: {
          type: 'string',
          format: 'binary',
          example: 'image.jpg',
        },
        type: {
          type: 'string',
          example: 'Cat',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('filename', {
      storage: diskStorage({
        destination: '/tmp', // Define onde os arquivos serão salvos
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname +
              '-' +
              uniqueSuffix +
              path.extname(file.originalname),
          );
        },
      }),
    }),
  )
  createPet(
    @Body() dto: CreatePetDto,
    @UploadedFile('filename') filename: Express.Multer.File,
  ) {
    return this.petService.createPet(dto, filename);
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
