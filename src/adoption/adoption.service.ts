import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { ADOPTION__MODEL } from './provider/adoption.repository';
import { Adoption } from './schema/adoption.schema';
import { Model } from 'mongoose';
import { PetService } from 'src/pet/pet.service';

@Injectable()
export class AdoptionService {
  constructor(
    @Inject(ADOPTION__MODEL) private readonly adoptionModel: Model<Adoption>,
    @Inject(forwardRef(() => PetService))
    private readonly petService: PetService,
  ) {}

  async createAdoption(dto: CreateAdoptionDto) {
    try {
      const {
        email,
        livingSituation,
        phoneNo,
        previousExperience,
        familyComposition,
        petId,
      } = dto;
      if (
        !email ||
        !livingSituation ||
        !phoneNo ||
        !previousExperience ||
        !familyComposition ||
        !petId
      ) {
        throw new BadRequestException('Missing required fields');
      }
      const pet = await this.petService.getPetById(petId);
      if (!pet) {
        throw new NotFoundException('Pet does not exist');
      }
      const form = await this.adoptionModel.create({
        email,
        livingSituation,
        phoneNo,
        previousExperience,
        familyComposition,
        petId,
      });

      return {
        message: 'Adoption form created successfully',
        data: form,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Failed to create adoption form');
    }
  }

  async findAll() {
    try {
      const forms = await this.adoptionModel.find().sort({ createdAt: -1 });
      return {
        message: 'Adoption forms retrieved successfully',
        data: forms,
      };
    } catch (err) {
      console.log(err);
      throw new NotAcceptableException('Failed to retrieve adoption forms');
    }
  }

  async deleteForm(id: string) {
    try {
      const form = await this.adoptionModel.findById(id);
      if (!form) {
        throw new NotFoundException('Adoption form not found');
      }
      await this.adoptionModel.findByIdAndDelete(id);
      return {
        message: 'Adoption form deleted successfully',
      };
    } catch (err) {
      console.error(err);
      return {
        message: 'Failed to delete adoption form',
        data: err,
      };
    }
  }

  async deleteAllForms(id: string) {
    try {
      const forms = await this.adoptionModel.deleteMany({ petId: id });
      if (forms.deletedCount === 0) {
        return {
          message: 'No forms found',
          data: [],
        };
      }
      return {
        message: 'All forms deleted successfully',
      };
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Failed to delete forms');
    }
  }
}
