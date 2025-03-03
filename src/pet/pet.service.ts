import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PET__MODEL } from './provider/pet.repository';
import { Model } from 'mongoose';
import { CreatePetDto } from './dto/create-pet.dto';
import { Pet } from './schema/pet.schema';
import { AprovePetDto } from './dto/aprove-pet.dto';

@Injectable()
export class PetService {
  constructor(@Inject(PET__MODEL) private readonly petModel: Model<Pet>) {}
  private logger = new Logger('PetService');

  async createPet(dto: CreatePetDto, filename: Express.Multer.File) {
    try {
      const { name, age, area, justification, email, phone, type } = dto;
      if (
        !name ||
        !age ||
        !area ||
        !justification ||
        !email ||
        !phone ||
        !type
      ) {
        throw new BadRequestException('All fields are required');
      }

      if (age < 0) {
        throw new BadRequestException('Age must be greater than 0');
      }

      const existingPet = await this.petModel.findOne({ email });
      if (existingPet) {
        throw new BadRequestException('Pet already exists');
      }
      if (filename) {
        throw new BadRequestException('Filename is required');
      }
      if (filename) {
        dto.filename = dto.filename;
      }
      const pet = await this.petModel.create({
        name,
        age,
        area,
        justification,
        email,
        phone,
        type,
        filename: dto.filename,
        status: 'pendente',
      });
      return {
        message: 'Pet created successfully',
        data: pet,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }

  async aprovedPet(id: string, dto: AprovePetDto) {
    try {
      const pet = await this.petModel.findById(id);
      if (!pet) {
        throw new NotFoundException('Pet not found');
      }
      const { email, phone, status } = dto;
      await this.petModel.findByIdAndUpdate(
        id,
        { email, phone, status },
        { new: true },
      );
      return {
        message: 'Pet aproved successfully',
        data: pet,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }

  async getAllPets(status?: string) {
    try {
      const allStatus = ['pendente', 'aprovado', 'negado'];
      if (status && !allStatus.includes(status)) {
        throw new BadRequestException('Invalid status');
      }
      const pets = await this.petModel.find({ status: status });
      if (pets.length > 0) {
        return {
          message: 'Pets retrieved successfully',
          data: pets,
        };
      } else {
        return {
          message: 'No pets found',
          data: [],
        };
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteAllPets(id: string) {
    try {
      const pet = await this.petModel.findById(id);
      if (!pet) {
        throw new NotFoundException('Pet not found');
      }
      await this.petModel.findByIdAndDelete({ _id: id });
      return {
        message: 'Pet deleted successfully',
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getPetById(id: string) {
    try {
      const pet = await this.petModel.findById(id);
      if (!pet) {
        throw new NotFoundException('Pet not found');
      }
      return {
        message: 'Pet retrieved successfully',
        data: pet,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
